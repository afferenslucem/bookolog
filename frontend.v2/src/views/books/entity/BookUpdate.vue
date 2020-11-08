<template>
    <div>
        <form class="needs-validation" @submit="submit($event)">
            <div class="form-group">
                <label class="required" for="name">{{ $t('book.form.titles.name') }}</label>
                <input
                        type="text"
                        name="name"
                        id="name"
                        class="form-control"
                        :pattern="bookNamePattern"
                        required
                        v-model.trim="book.name"
                        autocomplete="off"
                        placeholder="Война и мир"
                />
            </div>

            <div class="form-group">
                <label for="authors">{{ $t('book.form.titles.authors') }}</label>
                <tag-list-input
                        id="authors"
                        :datalist="existingAuthors"
                        :tags.sync="book.authors"
                        name="authors"
                        placeholder="Лев Толстой"
                ></tag-list-input>
            </div>

            <div class="form-group">
                <label for="year">{{ $t('book.form.titles.year') }}</label>
                <input
                        type="number"
                        name="year"
                        id="year"
                        class="form-control"
                        v-model.number="book.year"
                        placeholder="1965"
                />
            </div>

            <div class="form-group">
                <label for="genre">{{ $t('book.form.titles.genre') }}</label>
                <completable-input
                        id="genre"
                        name="genre"
                        :value.sync="book.genre"
                        :datalist="existingGenres"
                        placeholder="Эпопея"
                ></completable-input>
            </div>

            <div class="form-group">
                <label for="tags">
                    {{ $t('book.form.titles.tags') }}
                </label>
                <tag-list-input
                        id="tags"
                        :datalist="existingTags"
                        :tags.sync="book.tags"
                        name="tags"
                        placeholder="Классика"
                ></tag-list-input>
            </div>

            <div class="form-group">
                <label for="status">{{ $t("book.form.titles.status") }}</label>
                <select
                        class="form-control"
                        name="status"
                        id="status"
                        v-model.number="book.status"
                        @change="statusChange()"
                >
                    <option
                            v-for="option in statuses"
                            :key="option.value"
                            :value="option.value"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="type">{{ $t("book.form.titles.type") }}</label>
                <select
                        class="form-control"
                        name="type"
                        id="type"
                        v-model.number="book.type"
                >
                    <option
                            v-for="option in bookTypes"
                            :key="option.value"
                            :value="option.value"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <div v-show="showProgress" class="progress-input" :class="{ 'is-invalid': !unitsValid }">
                <div v-if="book.type === 2" class="form-group progress-row form-row">
                    <label>{{ $t('book.form.titles.progress.listen.title') }}</label>
                    <audio-book-units-input
                            id="doneUnits"
                            class="col-5"
                            :units.sync="book.doneUnits"
                    ></audio-book-units-input>
                    <div class="col-2 from">{{ $t("book.form.titles.progress.from") }}</div>
                    <audio-book-units-input
                            id="totalUnits"
                            class="col-5"
                            :units.sync="book.totalUnits"
                    ></audio-book-units-input>
                </div>
                <div v-else class="form-group">
                    <label>{{ $t('book.form.titles.progress.read.title') }}</label>
                    <div class="input-group">
                        <input
                                type="number"
                                name="done"
                                id="doneUnits"
                                class="form-control"
                                :placeholder="progressDonePlaceholder"
                                v-model.number="book.doneUnits"
                                :max="Math.min(book.totalUnits, maxUnitsCount)"
                        />
                        <input
                                type="number"
                                name="total"
                                id="totalUnits"
                                class="form-control"
                                :placeholder="$t('book.form.titles.progress.total')"
                                v-model.number="book.totalUnits"
                                :min="book.doneUnits"
                                :max="maxUnitsCount"
                        />
                    </div>
                </div>
            </div>

            <div class="form-row dates" :class="{ 'is-invalid': !datesValid }">
                <div class="col-12 col-md-6 form-group" v-show="showStartDate">
                    <label for="startDate">{{ $t("book.form.titles.started") }}</label>
                    <date-input
                            id="startDate"
                            class="start-date"
                            :year.sync="book.startDateYear"
                            :month.sync="book.startDateMonth"
                            :day.sync="book.startDateDay"
                    />
                </div>
                <div class="col-12 col-md-6 form-group" v-show="showEndDate">
                    <label for="endDate">{{ $t("book.form.titles.finished") }}</label>
                    <date-input
                            id="endDate"
                            class="end-date"
                            :year.sync="book.endDateYear"
                            :month.sync="book.endDateMonth"
                            :day.sync="book.endDateDay"
                    />
                </div>
                <div class="invalid-feedback">
                    {{ $t("book.form.titles.dateInput.error") }}
                </div>
            </div>

            <div class="form-group">
                <label for="note">{{ $t("book.form.titles.notes") }}</label>
                <textarea
                        type="text"
                        name="note"
                        id="note"
                        class="form-control"
                        rows="5"
                        v-model.trim="book.note"
                ></textarea>
            </div>

            <div class="form-group">
                <button
                        class="btn btn-primary w-100 submit"
                        type="submit"
                        :disabled="!formValid"
                >
                    {{ $t("book.actions.save") }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import bookMixin from "@/mixins/book-form-mixin";
    import DateInput from "@/components/input/BookDateInput.vue";
    import AudioBookUnitsInput from "@/components/input/AudioBookUnitsInput.vue";
    import TagListInput from "@/components/input/TagListInput.vue";
    import CompletableInput from "@/components/input/AutoCompletableInput.vue";
    import {
        BOOK_UPDATE_ACTION,
        BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
        NOTIFICATION_SUCCESS_ACTION,
        NOTIFICATION_DANGER_ACTION,
        NOTIFICATION_WARNING_ACTION,
    } from "@/store/naming";
    import {NETWORK_ERROR} from "@/http/client";
    import store from "@/store";
    import i18n from "@/i18n";
    import {DONE_STATUS, IN_PROGRESS_STATUS, TO_READ_STATUS} from "@/models/book";

    export default {
        components: {
            DateInput,
            AudioBookUnitsInput,
            TagListInput,
            CompletableInput,
        },
        data: () => ({
            initialStatus: null,
            initialUnits: null,
        }),
        mixins: [bookMixin],
        methods: {
            async submit(event) {
                event.preventDefault();
                try {
                    await this.$store.dispatch(BOOK_UPDATE_ACTION, this.book);
                    this.updateSuccessfullRoutine();
                } catch (e) {
                    if (e == NETWORK_ERROR) {
                        this.updateOfflineRoutine();
                    } else {
                        this.cantUpdateRoutine();
                    }
                }
            },
            updateSuccessfullRoutine() {
                this.redirectForBook(this.book);
                this.$store.dispatch(
                    NOTIFICATION_SUCCESS_ACTION,
                    this.$t("book.notification.update.success")
                );
            },
            updateOfflineRoutine() {
                this.$store.dispatch(
                    NOTIFICATION_WARNING_ACTION,
                    this.$t("book.notification.update.offline")
                );
                this.redirectForBook(this.book);
            },
            cantUpdateRoutine() {
                this.$store.dispatch(
                    NOTIFICATION_DANGER_ACTION,
                    this.$t("book.notification.update.fail")
                );
            },
            statusChange() {
                if (this.initialStatus == DONE_STATUS) return;

                if (
                    this.initialStatus === IN_PROGRESS_STATUS &&
                    this.book.status === DONE_STATUS
                ) {
                    this.fromProgressToDoneStatusChange();
                } else if (
                    this.initialStatus === TO_READ_STATUS &&
                    this.book.status === IN_PROGRESS_STATUS
                ) {
                    this.fromToReadToProgressStatusChange();
                } else if (this.book.status === IN_PROGRESS_STATUS) {
                    this.resetForInProgress();
                } else if (this.book.status === TO_READ_STATUS) {
                    this.resetForToRead();
                }
            },
            fromProgressToDoneStatusChange() {
                this.book.endDateYear = new Date().getFullYear();
                this.book.endDateMonth = new Date().getMonth() + 1;
                this.book.endDateDay = new Date().getDate();

                this.book.doneUnits = this.book.totalUnits;
            },
            fromToReadToProgressStatusChange() {
                this.book.startDateYear = new Date().getFullYear();
                this.book.startDateMonth = new Date().getMonth() + 1;
                this.book.startDateDay = new Date().getDate();
            },
            resetForInProgress() {
                this.resetEndDate();

                this.book.doneUnits = this.initialUnits;
            },
            resetForToRead() {
                this.resetEndDate();
                this.resetStartDate();

                this.book.doneUnits = this.initialUnits;
            },
            resetEndDate() {
                this.book.endDateYear = null;
                this.book.endDateMonth = null;
                this.book.endDateDay = null;
            },
            resetStartDate() {
                this.book.startDateYear = null;
                this.book.startDateMonth = null;
                this.book.startDateDay = null;
            },
        },
        async beforeRouteEnter(to, from, next) {
            const bookGuid = to.params.guid;
            try {
                const book = await store.dispatch(
                    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
                    bookGuid
                );
                next((vm) => {
                    vm.book = Object.assign({}, book);
                    vm.initialStatus = book.status;
                    vm.initialUnits = book.doneUnits;
                });
            } catch (e) {
                store.dispatch(
                    NOTIFICATION_DANGER_ACTION,
                    i18n.t("book.notification.load.fail")
                );
            }
        },
    };
</script>

<style lang="scss" scoped>
    .progress-row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .from {
            align-self: center;
            text-align: center;
        }
    }
</style>
