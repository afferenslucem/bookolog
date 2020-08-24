<template>
  <div class="container mt-3">
    <form>
      <div class="form-group">
        <input type="text" name="name" id="name" class="form-control" placeholder="Название" />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="authors"
          id="authors"
          class="form-control"
          placeholder="Авторы"
          aria-describedby="authorsInput"
          pattern="[А-z-,]*"
        />
        <small id="authorsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <input type="number" name="year" id="year" class="form-control" placeholder="Год выпуска" />
      </div>
      <div class="form-group">
        <input type="text" name="genre" id="genre" class="form-control" placeholder="Жанр">
      </div>
      <div class="form-group">
        <input
          type="text"
          name="tags"
          id="tags"
          class="form-control"
          placeholder="Теги"
          aria-describedby="tagsInput"
          pattern="[А-z-,]*"
        />
        <small id="tagsInput" class="text-muted">Вводите через запятую</small>
      </div>
      <div class="form-group">
        <select class="form-control" name="status" id="status">
          <option>Собираюсь читать</option>
          <option>Читаю</option>
          <option>Прочитал</option>
        </select>
      </div>
      <div class="row progress-row form-group">
        <div class="col-5">
          <input
            type="text"
            name="done"
            id="doneUnits"
            class="form-control"
            placeholder="Прочитано"
          />
        </div>
        <div class="col-2 from">Из</div>
        <div class="col-5">
          <input type="text" name="total" id="totalUnits" class="form-control" placeholder="Всего" />
        </div>
      </div>
      <div class="row form-group">
        <div class="col">
          <div class="form-group">
            <label for="startDate">Начата</label>
            <input type="date" name="startDate" id="startDate" class="form-control">
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="endDate">Окончена</label>
            <input type="date" name="endDate" id="endDate" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="note">Заметки</label>
        <textarea type="text" name="note" id="note" class="form-control" rows="5"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
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