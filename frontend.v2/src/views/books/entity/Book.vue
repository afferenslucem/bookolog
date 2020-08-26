<template>
  <div class="container mt-3">
    <h4>{{book.name}}</h4>
    <p class="authors" v-if="book.authors">{{book.authors | join}}</p>
    <p v-if="book.year">
      <span>Год издания:</span>
      <span>{{book.year}}</span>
    </p>
    <p>
      <span>Тип:</span>
      <span v-if="book.type === PAPER_BOOK_TYPE">Бумажная книга</span>
      <span v-else-if="book.type === ELECTRONIC_BOOK_TYPE">Электронная книга</span>
      <span v-else>Аудиокнига</span>
    </p>
    <p v-if="book.genre">
      <span>Жанр:</span>
      <span>{{book.genre | capital}}</span>
    </p>
    <p>
      <span>Статус:</span>
      <span v-if="book.status === TO_READ_STATUS">К Прочтению</span>
      <span v-else-if="book.status === IN_PROGRESS_STATUS">Читаю</span>
      <span v-else>Прочитал</span>
    </p>
    <p class="tags" v-if="book.tags">
      <span>Теги:</span>
      <span class="value">{{book.tags | capital | join}}</span>
    </p>
    <div v-if="shouldShowProgress">
        <h6>Прогресс</h6>
        <progress-bar :progress="progress"></progress-bar>
    </div>
    <p v-if="startedBook && book.startDate">
      <span>Начата:</span>
      <span>{{startDate}}</span>
    </p>
    <p v-if="doneBook && book.endDate">
      <span>Закончена:</span>
      <span>{{startDate}}</span>
    </p>
    <button class="w-100 btn btn-danger" @click="deleteBook()">Удалить</button>
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
import ProgressBar from "@/components/book/ProgressBar.vue";

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
      }
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