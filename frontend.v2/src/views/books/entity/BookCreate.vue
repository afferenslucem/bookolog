<template>
  <div class="container mt-3">
    <form class="needs-validation" novalidate @submit="submit($event)">
      <div class="form-group">
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          placeholder="Название"
          pattern="[A-Za-zА-Яа-яЁё0-9\s\\.\\,\\(\\)\\-]+"
          required
          v-model.trim="book.name"
        />
        <div class="invalid-feedback">Это обязательное поле</div>
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
        <input type="number" name="year" id="year" class="form-control" placeholder="Год выпуска" />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="genre"
          id="genre"
          class="form-control"
          placeholder="Жанр"
          pattern="[A-Za-zА-Яа-яЁё\s\\-]+"
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
        />
        <small id="tagsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <label for="status">Статус книги</label>
        <select class="form-control" name="status" id="status">
          <option>Собираюсь читать</option>
          <option>Читаю</option>
          <option>Прочитал</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Тип книги</label>
        <select class="form-control" name="type" id="type">
          <option>Бумажная книга</option>
          <option>Электронная книга</option>
          <option>Аудиокнига</option>
        </select>
      </div>
      <label for="progress">Прочитано</label>
      <div class="row progress-row form-group">
        <div class="col-5" id="progress">
          <input
            type="number"
            name="done"
            id="doneUnits"
            class="form-control"
            placeholder="Страниц"
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
          />
        </div>
      </div>
      <div class="row form-group">
        <div class="col">
          <div class="form-group">
            <label for="startDate">Начата</label>
            <input type="date" name="startDate" id="startDate" class="form-control" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="endDate">Окончена</label>
            <input type="date" name="endDate" id="endDate" class="form-control" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="note">Заметки</label>
        <textarea type="text" name="note" id="note" class="form-control" rows="5"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getLogger } from '@/logger';

const logger = getLogger('Form')

export default {
  data: () => ({
    book: {
      name: "",
      authors: [],
    }
  }),
  methods: {
    submit(event) {
      logger.debug('книга', this.book);
      event.preventDefault()
    },
  },
  computed: {
    authorsComp: {
      get: function () {
        return this.book.authors.join(", ");
      },
      set: function (value) {
        this.book.authors = value.split(",").map((item) => item.trim());
      },
    },
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