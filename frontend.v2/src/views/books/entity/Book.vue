<template>
  <div class="container">
    <h4>{{book.name}}</h4>
    <p class="authors" v-if="book.authors && (book.authors.length > 0)">{{book.authors | join}}</p>
    <p v-if="book.year">
      <span>{{ $t('book.entity.year') }}:</span>
      <span>{{book.year}}</span>
    </p>
    <p class="book-type">
      <span>{{ $t('book.entity.type.title') }}:</span>
      <span v-if="book.type === PAPER_BOOK_TYPE">{{ $t('book.entity.type.paper') }}</span>
      <span v-else-if="book.type === ELECTRONIC_BOOK_TYPE">{{ $t('book.entity.type.electronic') }}</span>
      <span v-else>{{ $t('book.entity.type.audio') }}</span>
    </p>
    <p v-if="book.genre" class="genre">
      <span>{{ $t('book.entity.genre') }}:</span>
      <span>{{book.genre | capital}}</span>
    </p>
    <p class="status">
      <span>{{ $t('book.entity.status.title') }}:</span>
      <span v-if="book.status === TO_READ_STATUS">{{ $t('book.entity.status.toRead') }}</span>
      <span v-else-if="book.status === IN_PROGRESS_STATUS">{{ $t('book.entity.status.inProgress') }}</span>
      <span v-else>{{ $t('book.entity.status.done') }}</span>
    </p>
    <p class="tags" v-if="book.tags && (book.tags.length > 0)">
      <span>{{ $t('book.entity.tags') }}:</span>
      <span class="value">{{book.tags | capital | join}}</span>
    </p>
    <div v-if="shouldShowProgress" class="progress">
      <h6>{{ $t('book.entity.progress') }}:</h6>
      <progress-bar :progress="progress"></progress-bar>
    </div>
    <p v-if="startedBook && book.startDate" class="start-date">
      <span>{{ $t('book.entity.started') }}:</span>
      <span>{{startDate}}</span>
    </p>
    <p v-if="doneBook && book.endDate" class="end-date">
      <span>{{ $t('book.entity.finished') }}:</span>
      <span>{{endDate}}</span>
    </p>
    <p v-if="book.note" class="note">
      <span>{{ $t('book.entity.notes') }}:</span>
      <span>{{book.note}}</span>
    </p>
    <button class="w-100 btn btn-danger" data-toggle="modal" data-target="#bookDeleteModal">{{ $t('book.actions.delete') }}</button>

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
            <h5 class="modal-title" id="bookDeleteModalLabel">{{ $t('book.deleteModal.title') }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ $t('book.deleteModal.sure') }}</p>
            <p>{{ $t('book.deleteModal.cantRollback') }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('buttons.cancel') }}</button>
            <button type="button" class="btn btn-danger" @click="deleteBook()"  data-dismiss="modal">{{ $t('buttons.delete') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BOOK_GET_BY_GUID_ACTION, BOOK_DELETE_ACTION } from "@/store/naming";
import {
  TO_READ_STATUS,
  IN_PROGRESS_STATUS,
  DONE_STATUS,
  PAPER_BOOK_TYPE,
  ELECTRONIC_BOOK_TYPE,
  AUDIO_BOOK_TYPE,
} from "@/models/book";
import bookEntityMixin from "@/mixins/book-entity-mixin";
import ProgressBar from "@/components/book-module/book/ProgressBar.vue";

export default {
  components: {
    ProgressBar,
  },
  data: () => ({
    book: {},
  }),
  mixins: [bookEntityMixin],
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
  methods: {
    deleteBook() {
      this.$store.dispatch(BOOK_DELETE_ACTION, this.book.guid);
      history.back();
    },
  },
  async created() {
    const bookGuid = this.$route.params.guid;
    this.book = await this.$store.dispatch(BOOK_GET_BY_GUID_ACTION, bookGuid);
  },
};
</script>

<style lang="scss" scoped>
.authors {
  font-size: large;
  font-weight: 500;
}

p,
div {
  margin-bottom: 0.75rem;
}

p {
  display: flex;
  justify-content: space-between;
}

.tags {
  .value {
    text-align: right;
  }
}
</style>