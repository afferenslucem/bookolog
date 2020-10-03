<template>
  <div class="container">
    <small class="dark-text">* {{ $t("book.form.titles.required") }}</small>
    <form class="needs-validation" @submit="submit($event)">
      <div class="form-group">
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          :placeholder="`${$t('book.form.titles.name')}*`"
          :pattern="bookNamePattern"
          required
          v-model.trim="book.name"
          autocomplete="off"
        />
      </div>
      <tag-list-input
        class="form-group"
        :placeholder="$t('book.form.titles.authors')"
        :datalist="existingAuthors"
        :tags.sync="book.authors"
      ></tag-list-input>
      <div class="form-group">
        <input
          type="number"
          name="year"
          id="year"
          class="form-control"
          v-model.number="book.year"
          :placeholder="$t('book.form.titles.year')"
        />
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
      <tag-list-input
        class="form-group"
        :placeholder="$t('book.form.titles.tags')"
        :datalist="existingTags"
        :tags.sync="book.tags"
      ></tag-list-input>
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
      <div
        class="row progress-row form-group"
        :class="{ 'is-invalid': !unitsValid }"
        v-show="showProgress"
      >
        <label class="col-12" for="progress" v-show="showProgress">{{
          progressHeader
        }}</label>
        <div class="col-5" id="progress">
          <audio-book-units-input
            id="doneUnits"
            v-if="book.type === 2"
            :units.sync="book.doneUnits"
          ></audio-book-units-input>
          <input
            v-else
            type="number"
            name="done"
            id="doneUnits"
            class="form-control"
            :placeholder="progressDonePlaceholder"
            v-model.number="book.doneUnits"
            :max="Math.min(book.totalUnits, maxUnitsCount)"
          />
        </div>
        <div class="col-2 from">{{ $t("book.form.titles.progress.from") }}</div>
        <div class="col-5">
          <audio-book-units-input
            id="totalUnits"
            v-if="book.type === 2"
            :units.sync="book.totalUnits"
          ></audio-book-units-input>
          <input
            v-else
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
        <div class="invalid-feedback">
          {{ progressError }}
        </div>
      </div>
      <div class="row form-group dates" :class="{ 'is-invalid': !datesValid }">
        <div class="col-12 col-md-6" v-show="showStartDate">
          <div class="start-date">
            <label for="startDate">{{ $t("book.form.titles.started") }}</label>
            <date-input
              :year.sync="book.startDateYear"
              :month.sync="book.startDateMonth"
              :day.sync="book.startDateDay"
            ></date-input>
          </div>
        </div>
        <div class="col-12 col-md-6" v-show="showEndDate">
          <div class="end-date">
            <label for="endDate">{{ $t("book.form.titles.finished") }}</label>
            <date-input
              :year.sync="book.endDateYear"
              :month.sync="book.endDateMonth"
              :day.sync="book.endDateDay"
            ></date-input>
          </div>
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
import DateInput from "@/components/inputs/BookDateInput.vue";
import AudioBookUnitsInput from "@/components/inputs/AudioBookUnitsInput.vue";
import TagListInput from '@/components/inputs/TagListInput.vue';
import {
  BOOK_UPDATE_ACTION,
  BOOK_GET_BY_GUID_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
  NOTIFICATION_DANGER_ACTION,
} from "@/store/naming";
import store from "@/store";
import { DONE_STATUS, IN_PROGRESS_STATUS, TO_READ_STATUS } from "@/models/book";

export default {
  components: {
    DateInput,
    AudioBookUnitsInput,
    TagListInput,
  },
  data: () => ({
    initialStatus: null,
    initialUnits: null,
  }),
  mixins: [bookMixin],
  methods: {
    submit(event) {
      this.$store
        .dispatch(BOOK_UPDATE_ACTION, this.book)
        .then(() => {
          this.redirectForBook(this.book);
          this.$store.dispatch(
            NOTIFICATION_SUCCESS_ACTION,
            this.$t("book.notification.update.success")
          );
          this.$forceUpdate();
        })
        .catch(() =>
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("book.notification.update.fail")
          )
        );

      event.preventDefault();
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
  beforeRouteEnter(to, from, next) {
    const bookGuid = to.params.guid;
    store.dispatch(BOOK_GET_BY_GUID_ACTION, bookGuid).then((book) => {
      next((vm) => {
        vm.book = Object.assign({}, book);
        vm.initialStatus = book.status;
        vm.initialUnits = book.doneUnits;
      });
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