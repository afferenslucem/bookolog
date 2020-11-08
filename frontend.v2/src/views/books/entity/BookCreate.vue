<template>
    <div class="create-form">
        <form class="needs-validation" @submit="prefill($event)">
            <div class="form-group">
                <label class="required" for="name">{{ $t('book.form.name.title') }}</label>
                <input type="text"
                       name="name"
                       id="name"
                       class="form-control"
                       :pattern="bookNamePattern"
                       required
                       v-model.trim="book.name"
                       autocomplete="off"
                       :placeholder="$t('book.form.name.placeholder')"
                />
            </div>

            <div class="form-group">
                <label for="authors">{{ $t('book.form.authors.title') }}</label>
                <tag-list-input id="authors"
                                :datalist="existingAuthors"
                                :tags.sync="book.authors"
                                name="authors"
                                :placeholder="$t('book.form.authors.placeholder')"
                />
            </div>

            <div class="form-group">
                <label for="year">{{ $t('book.form.year.title') }}</label>
                <input type="number"
                       name="year"
                       id="year"
                       class="form-control"
                       v-model.number="book.year"
                       :placeholder="$t('book.form.year.placeholder')"
                />
            </div>

            <div class="form-group">
                <label for="genre">{{ $t('book.form.genre.title') }}</label>
                <completable-input id="genre"
                                   name="genre"
                                   :value.sync="book.genre"
                                   :datalist="existingGenres"
                                   :placeholder="$t('book.form.genre.placeholder')"
                />
            </div>

            <div class="form-group">
                <label for="tags">{{ $t('book.form.tags.title') }}</label>
                <tag-list-input id="tags"
                                :datalist="existingTags"
                                :tags.sync="book.tags"
                                name="tags"
                                :placeholder="$t('book.form.tags.placeholder')"
                />
            </div>

            <div class="form-group">
                <label for="status">{{ $t("book.form.status.title") }}</label>
                <select class="form-control"
                        name="status"
                        id="status"
                        v-model.number="book.status"
                >
                    <option v-for="option in statuses"
                            :key="option.value"
                            :value="option.value"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="type">{{ $t("book.form.type.title") }}</label>
                <select class="form-control"
                        name="type"
                        id="type"
                        v-model.number="book.type"
                >
                    <option v-for="option in bookTypes"
                            :key="option.value"
                            :value="option.value"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <div v-show="showProgress" class="progress-input" :class="{ 'is-invalid': !unitsValid }">
                <div v-if="book.type === 2" class="form-group progress-row form-row">
                    <label>{{ $t('book.form.progress.audio.title') }}</label>
                    <audio-book-units-input id="doneUnits"
                                            class="col-5"
                                            :units.sync="book.doneUnits"
                    ></audio-book-units-input>
                    <div class="col-2 from">{{ $t("book.form.progress.from") }}</div>
                    <audio-book-units-input id="totalUnits"
                                            class="col-5"
                                            :units.sync="book.totalUnits"
                    ></audio-book-units-input>
                </div>
                <div v-else class="form-group">
                    <label>{{ $t('book.form.progress.paper.title') }}</label>
                    <div class="input-group">
                        <input type="number"
                               name="done"
                               id="doneUnits"
                               class="form-control"
                               :placeholder="$t('book.form.progress.paper.pages')"
                               v-model.number="book.doneUnits"
                               :max="Math.min(book.totalUnits, maxUnitsCount)"
                        />
                        <input type="number"
                               name="total"
                               id="totalUnits"
                               class="form-control"
                               :placeholder="$t('book.form.progress.paper.total')"
                               v-model.number="book.totalUnits"
                               :min="book.doneUnits"
                               :max="maxUnitsCount"
                        />
                    </div>
                </div>
            </div>

            <div class="form-row dates" :class="{ 'is-invalid': !datesValid }">
                <div class="col-12 col-md-6 form-group" v-show="showStartDate">
                    <label for="startDate">{{ $t("book.form.startDate.title") }}</label>
                    <date-input id="startDate"
                                class="start-date"
                                :year.sync="book.startDateYear"
                                :month.sync="book.startDateMonth"
                                :day.sync="book.startDateDay"
                    />
                </div>
                <div class="col-12 col-md-6 form-group" v-show="showEndDate">
                    <label for="endDate">{{ $t("book.form.endDate.title") }}</label>
                    <date-input id="endDate"
                                class="end-date"
                                :year.sync="book.endDateYear"
                                :month.sync="book.endDateMonth"
                                :day.sync="book.endDateDay"
                    />
                </div>
                <div class="invalid-feedback">
                    {{ $t("book.form.errors.endDateGreaterThenStartDate") }}
                </div>
            </div>

            <div class="form-group">
                <label for="note">{{ $t("book.form.notes.title") }}</label>
                <textarea type="text"
                          name="note"
                          id="note"
                          class="form-control"
                          rows="5"
                          v-model.trim="book.note"
                ></textarea>
            </div>

            <div class="form-group">
                <button class="btn btn-primary w-100 submit"
                        type="submit"
                        @click="submit()"
                        :disabled="!formValid"
                >
                    {{ $t("book.actions.save") }}
                </button>
                <button class="btn btn-info mt-1 w-100 mt-3 submit-and-new"
                        type="submit"
                        @click="submitAndAdd()"
                        :disabled="!formValid"
                >
                    {{ $t("book.actions.saveAndAdd") }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import bookMixin from "@/mixins/book-form-mixin";
    import DateInput from "@/components/input/BookDateInput.vue";
    import AudioBookUnitsInput from "@/components/input/AudioBookUnitsInput.vue";
    import CompletableInput from "@/components/input/AutoCompletableInput.vue";
    import TagListInput from "@/components/input/TagListInput.vue";
    import {
        BOOK_ADD_ACTION,
        NOTIFICATION_SUCCESS_ACTION,
        NOTIFICATION_DANGER_ACTION,
        NOTIFICATION_WARNING_ACTION,
    } from "@/store/naming";
    import {NETWORK_ERROR} from "@/http/client";

    export default {
        components: {
            DateInput,
            AudioBookUnitsInput,
            TagListInput,
            CompletableInput,
        },
        mixins: [bookMixin],
        data: () => ({
            action: null,
        }),
        methods: {
            prefill(event) {
                if (this.action) {
                    this.action();
                }
                event.preventDefault();
                return false;
            },
            async submitAction() {
                try {
                    await this.$store.dispatch(BOOK_ADD_ACTION, this.book);
                    this.redirectForBook(this.book);
                    this.$store.dispatch(
                        NOTIFICATION_SUCCESS_ACTION,
                        this.$t("book.notification.save.success")
                    );
                } catch (e) {
                    if (e == NETWORK_ERROR) {
                        this.redirectForBook(this.book);
                        this.$store.dispatch(
                            NOTIFICATION_WARNING_ACTION,
                            this.$t("book.notification.save.offline")
                        );
                    } else {
                        this.$store.dispatch(
                            NOTIFICATION_DANGER_ACTION,
                            this.$t("book.notification.save.fail")
                        );
                    }
                }
            },
            submit() {
                this.action = this.submitAction;
            },
            async submitAndAddAction() {
                try {
                    await this.$store.dispatch(BOOK_ADD_ACTION, this.book);
                    this.renavigate();
                    this.$store.dispatch(
                        NOTIFICATION_SUCCESS_ACTION,
                        this.$t("book.notification.save.success")
                    );
                } catch (e) {
                    if (e == NETWORK_ERROR) {
                        this.$store.dispatch(
                            NOTIFICATION_WARNING_ACTION,
                            this.$t("book.notification.save.offline")
                        );
                        this.renavigate();
                    } else {
                        this.$store.dispatch(
                            NOTIFICATION_DANGER_ACTION,
                            this.$t("book.notification.save.fail")
                        );
                    }
                }
            },
            submitAndAdd() {
                this.action = this.submitAndAddAction;
            },
            renavigate() {
                this.resetBook(this.$route.params.status);
                document.querySelector(".create-form").scrollTo(0, 0);
            },
        },
        created() {
            this.book.status = Number(this.$route.params.status);
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/styles/variables";

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
