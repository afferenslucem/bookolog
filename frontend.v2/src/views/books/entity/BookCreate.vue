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
      <div class="row">
        <div class="col">
          <input
            type="text"
            name="done"
            id="doneUnits"
            class="form-control"
            placeholder="Прочитано"
          />
        </div>
        <div class="col">
          <input type="text" name="total" id="totalUnits" class="form-control" placeholder="Всего" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>