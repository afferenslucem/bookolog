<template>
  <div class="container mt-3">
    <small class="dark-text">* Обязательная информация</small>
    <form class="needs-validation" @submit="submit($event)">
      <div class="form-group">
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          placeholder="Название *"
          pattern="[A-Za-zА-Яа-яЁё0-9\s\\.\\,\\(\\)\\-\\:]+"
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
          placeholder="Авторы"
          aria-describedby="authorsInput"
          pattern="[A-Za-zА-Яа-яЁё0-9\s\\.\\,\\(\\)\\-]+"
          v-model="authorsComp"
        />
        <small id="authorsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <input type="number" name="year" id="year" class="form-control" v-model.number="book.year" placeholder="Год выпуска" />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="genre"
          id="genre"
          class="form-control"
          placeholder="Жанр"
          pattern="[A-Za-zА-Яа-яЁё\s\\-]+"
          v-model="book.genre"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="tags"
          id="tags"
          class="form-control"
          placeholder="Теги"
          aria-describedby="tagsInput"
          pattern="[A-Za-zА-Яа-яЁё0-9\s\\.\\,\\(\\)\\-]+"
          v-model="tagsComp"
        />
        <small id="tagsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <label for="status">Статус книги</label>
        <select class="form-control" name="status" id="status" v-model.number="book.status">
          <option v-for="option in statuses" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Тип книги</label>
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
        <div class="col-2 from">Из</div>
        <div class="col-5">
          <input
            type="number"
            name="total"
            id="totalUnits"
            class="form-control"
            placeholder="Всего"
            v-model.number="book.totalUnits"
            :min="book.doneUnits"
          />
        </div>
      </div>
      <div class="row form-group">
        <div class="col" v-show="showStartDate">
          <div class="form-group">
            <label for="startDate">Начата</label>
            <input type="date" name="startDate" id="startDate" class="form-control" v-model="book.startDate" :max="book.endDate | calendarDate" />
          </div>
        </div>
        <div class="col" v-show="showEndDate">
          <div class="form-group">
            <label for="endDate">Окончена</label>
            <input type="date" name="endDate" id="endDate" class="form-control" v-model="book.endDate" :min="book.startDate | calendarDate" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="note">Заметки</label>
        <textarea type="text" name="note" id="note" class="form-control" rows="5" v-model.trim="book.note"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100" type="submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import bookMixin from '@/mixins/book-form-mixin';
import { BOOK_ADD_ACTION } from '@/store/naming';

export default {
  mixins: [bookMixin],
  methods: {
    submit(event) {
      this.setMeta();
      this.$store.dispatch(BOOK_ADD_ACTION, this.book);

      this.redirectForBook(this.book);
      event.preventDefault()
    },
  },
  created() {
    this.book.status = Number(this.$route.params.status)
  }
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