<template>
    <div class="book">
        <book-header :book="book"></book-header>
        <p class="book__authors" v-if="book.authors && book.authors.length > 0">
            <no-wrap-values class="value" :values="book.authors | capital"></no-wrap-values>
        </p>
        <p v-if="book.year">
            <span>{{ $t("book.entity.year") }}:</span>
            <span>{{ book.year }}</span>
        </p>
        <p class="book__book-type">
            <span>{{ $t("book.entity.type.title") }}:</span>
            <span v-if="book.type === PAPER_BOOK_TYPE">{{
        $t("book.entity.type.paper")
      }}</span>
            <span v-else-if="book.type === ELECTRONIC_BOOK_TYPE">{{
        $t("book.entity.type.electronic")
      }}</span>
            <span v-else>{{ $t("book.entity.type.audio") }}</span>
        </p>
        <p v-if="book.genre" class="book__genre">
            <span>{{ $t("book.entity.genre") }}:</span>
            <router-link :to="{name: 'ByGenre', params: {name: book.genre}}">{{ book.genre | capital }}</router-link>
        </p>
        <p class="book__status">
            <span>{{ $t("book.entity.status.title") }}:</span>
            <router-link :to="{ name: 'ToRead' }" v-if="book.status === TO_READ_STATUS">{{
                $t("book.entity.status.toRead")
                }}
            </router-link>
            <router-link :to="{ name: 'InProgress' }" v-else-if="book.status === IN_PROGRESS_STATUS">{{
                $t("book.entity.status.inProgress")
                }}
            </router-link>
            <router-link :to="{ name: 'Done' }" v-else>{{
                $t("book.entity.status.done")
                }}
            </router-link>
        </p>
        <div class="book__tags" v-if="book.tags && book.tags.length > 0">
            <span class="label">{{ $t("book.entity.tags") }}:</span>

            <div class="tag-value" v-for="tag in book.tags" :key="tag" @click="goToTag(tag)">
                <tag-value :name="tag | capital" :hide-button="true"/>
            </div>
        </div>
        <div v-if="shouldShowProgress" class="book__progressing-bar">
            <h6>{{ $t("book.entity.progress") }}:</h6>
            <progress-bar :progress="progress"></progress-bar>
        </div>
        <p v-if="startedBook && book.startDate" class="book__start-date">
            <span>{{ $t("book.entity.started") }}:</span>
            <span>{{ book.startDate | dateFormat }}</span>
        </p>
        <p v-if="doneBook && book.endDate" class="book__end-date">
            <span>{{ $t("book.entity.finished") }}:</span>
            <span>{{ book.endDate | dateFormat }}</span>
        </p>
        <p v-if="book.note" class="book__note">
            <span>{{ $t("book.entity.notes") }}:</span>
            <span class="note-body">{{ book.note }}</span>
        </p>
        <button
                class="w-100 mt-1 btn btn-primary"
                id="editBookButton"
                @click="goToEdit(book.guid)"
        >
            {{ $t("book.actions.edit") }}
        </button>
        <button
                class="w-100 btn btn-danger mt-3"
                data-toggle="modal"
                data-target="#bookDeleteModal"
        >
            {{ $t("book.actions.delete") }}
        </button>

        <!-- Modal -->
        <div
                class="modal fade"
                id="bookDeleteModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="bookDeleteModalLabel"
                aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="bookDeleteModalLabel">
                            {{ $t("book.deleteModal.title") }}
                        </h5>
                        <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ $t("book.deleteModal.sure") }}</p>
                        <p>{{ $t("book.deleteModal.cantRollback") }}</p>
                    </div>
                    <div class="modal-footer">
                        <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                        >
                            {{ $t("buttons.cancel") }}
                        </button>
                        <button
                                type="button"
                                class="btn btn-danger"
                                @click="deleteBook()"
                                data-dismiss="modal"
                        >
                            {{ $t("buttons.delete") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
        BOOK_DELETE_ACTION,
        NOTIFICATION_SUCCESS_ACTION,
        NOTIFICATION_DANGER_ACTION,
        NOTIFICATION_WARNING_ACTION,
    } from "@/store/naming";
    import store from "@/store";
    import i18n from "@/i18n";
    import {
        TO_READ_STATUS,
        IN_PROGRESS_STATUS,
        DONE_STATUS,
        PAPER_BOOK_TYPE,
        ELECTRONIC_BOOK_TYPE,
        AUDIO_BOOK_TYPE,
    } from "@/models/book";
    import {NETWORK_ERROR} from "@/http/client";
    import bookEntityMixin from "@/mixins/book-entity-mixin";
    import BookHeader from "@/components/book/book/BookHeader.vue";
    import TagValue from "@/components/input/TagValue";

    export default {
        components: {
            TagValue,
            BookHeader,
        },
        data: () => ({
            book: {},
        }),
        mixins: [bookEntityMixin],
        methods: {
            async deleteBook() {
                try {
                    await this.$store.dispatch(BOOK_DELETE_ACTION, this.book.guid);
                    this.goBack();
                    this.showDeleteSuccessNotification();
                } catch (e) {
                    if (e == NETWORK_ERROR) {
                        this.goBack();
                        this.showDeleteOfflineNotification();
                    } else {
                        this.showDeleteFailNotification();
                    }
                }
            },
            goToTag(tag) {
                this.$router.push({name: 'ByTag', params: {name: tag}})
            },
            goBack() {
                history.back();
            },
            showDeleteOfflineNotification() {
                this.$store.dispatch(
                    NOTIFICATION_WARNING_ACTION,
                    this.$t("book.notification.delete.offline")
                );
            },
            showDeleteSuccessNotification() {
                this.$store.dispatch(
                    NOTIFICATION_SUCCESS_ACTION,
                    this.$t("book.notification.delete.success")
                );
            },
            showDeleteFailNotification() {
                this.$store.dispatch(
                    NOTIFICATION_DANGER_ACTION,
                    this.$t("book.notification.delete.fail")
                );
            },
        },
        computed: {
            TO_READ_STATUS() {
                return TO_READ_STATUS;
            },
            IN_PROGRESS_STATUS() {
                return IN_PROGRESS_STATUS;
            },
            DONE_STATUS() {
                return DONE_STATUS;
            },
            PAPER_BOOK_TYPE() {
                return PAPER_BOOK_TYPE;
            },
            ELECTRONIC_BOOK_TYPE() {
                return ELECTRONIC_BOOK_TYPE;
            },
            AUDIO_BOOK_TYPE() {
                return AUDIO_BOOK_TYPE;
            },
        },
        async beforeRouteEnter(to, from, next) {
            const bookGuid = to.params.guid;
            try {
                const book = await store.dispatch(
                    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
                    bookGuid
                );
                next((vm) => (vm.book = book));
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
    .book {
        &__tags {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: flex-start;
            align-items: baseline;

            margin-bottom: 0 !important;

            .label {
                flex: 1 1 auto;
            }

            .separator {
                flex: 1 1 auto;
                max-width: 25%;
            }

            .tag-value {
                display: inline-block;

                &:not(:last-child) {
                    padding-right: .5rem;
                }
            }
        }

        &__authors {
            font-size: large;
            font-weight: 500;
        }

        &__note {
            flex-direction: column;
        }
    }

    p,
    div:not(.book-header):not(.book__progress-bar) {
        margin-bottom: 0.75rem;
    }

    p {
        display: flex;
        justify-content: space-between;

        > span:first-child {
            min-width: 60px;
        }
    }
</style>
