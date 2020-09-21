<template>
  <div class="container">
    <small class="dark-text">* {{ $t('book.form.titles.required') }}</small>
    <form class="needs-validation" @submit="submit($event)">
      <div class="form-group">
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          :placeholder="`${ $t('book.form.titles.name') }*`"
          :pattern="bookNamePattern"
          required
          v-model.trim="book.name"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="authors"
          id="authors"
          class="form-control"
          :placeholder="$t('book.form.titles.authors')"
          aria-describedby="authorsInput"
          :pattern="bookAuthorsPattern"
          v-model.trim="authorsComp"
        />
        <small id="authorsInput" class="text-muted">{{ $t('book.form.titles.splitByComma') }}</small>
      </div>
      <div class="form-group">
        <input type="number" name="year" id="year" class="form-control"
        v-model.number="book.year" :placeholder="$t('book.form.titles.year')" />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="genre"
          id="genre"
          class="form-control"
          :placeholder="$t('book.form.titles.genre')"
          :pattern="genrePattern"
          v-model.trim="book.genre"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="tags"
          id="tags"
          class="form-control"
          :placeholder="$t('book.form.titles.tags')"
          aria-describedby="tagsInput"
          :pattern="bookTagsPattern"
          v-model.trim="tagsComp"
        />
        <small id="tagsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <label for="status">{{ $t('book.form.titles.status') }}</label>
        <select class="form-control" name="status" id="status" v-model.number="book.status">
          <option v-for="option in statuses" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">{{ $t('book.form.titles.type') }}</label>
        <select class="form-control" name="type" id="type" v-model.number="book.type">
          <option v-for="option in bookTypes" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
      </div>
      <label for="progress" v-show="showProgress">{{progressHeader}}</label>
      <div class="row progress-row form-group" v-show="showProgress">
        <div class="col-5" id="progress">
          <input
            type="number"
            name="done"
            id="doneUnits"
            class="form-control"
            :placeholder="progressDonePlaceholder"
            v-model.number="book.doneUnits"
            :max="book.totalUnits"
          />
        </div>
        <div class="col-2 from">{{ $t('book.form.titles.progress.from') }}</div>
        <div class="col-5">
          <input
            type="number"
            name="total"
            id="totalUnits"
            class="form-control"
            :placeholder="$t('book.form.titles.progress.total')"
            v-model.number="book.totalUnits"
            :min="book.doneUnits"
          />
        </div>
      </div>
      <div class="row form-group">
        <div class="col-12 col-md-6" v-show="showStartDate">
          <div class="form-group start-date">
            <label for="startDate">{{ $t('book.form.titles.started') }}</label>
            <date-input :year.sync="book.startDateYear" :month.sync="book.startDateMonth" :day.sync="book.startDateDay"></date-input>
          </div>
        </div>
        <div class="col-12 col-md-6" v-show="showEndDate">
          <div class="form-group end-date">
            <label for="endDate">{{ $t('book.form.titles.finished') }}</label>
            <date-input :year.sync="book.endDateYear" :month.sync="book.endDateMonth" :day.sync="book.endDateDay"></date-input>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="note">{{ $t('book.form.titles.notes') }}</label>
        <textarea type="text" name="note" id="note" class="form-control" rows="5" v-model.trim="book.note"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100" type="submit">{{ $t('book.actions.save') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import bookMixin from "@/mixins/book-form-mixin";
import DateInput from '@/components/inputs/BookDateInput.vue';
import { BOOK_UPDATE_ACTION, BOOK_GET_BY_GUID_ACTION } from "@/store/naming";
import store from "@/store";

export default {
  components: {
    DateInput
  },
  mixins: [bookMixin],
  methods: {
    submit(event) {
      this.$store.dispatch(BOOK_UPDATE_ACTION, this.book).then(() => {
        this.redirectForBook(this.book);
        this.$forceUpdate();
      });

      event.preventDefault();
    },
  },
  beforeRouteEnter(to, from, next) {
    const bookGuid = to.params.guid;
    store.dispatch(BOOK_GET_BY_GUID_ACTION, bookGuid).then((book) => {
      next((vm) => (vm.book = book));
    });
  },
};
</script>

<style lang="scss" scoped>
.progress-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .from {
    text-align: center;
  }
}
</style>