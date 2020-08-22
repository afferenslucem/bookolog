<template>
  <div class="container mt-3">
    <form>
      <div class="form-group">
        <input type="text" name="name" id="name" class="form-control" placeholder="Название">
      </div>
      <div class="form-group">
        <input type="text" name="authors" id="authors" class="form-control" placeholder="Авторы" aria-describedby="authorsInput" pattern="[А-z-,]*">
        <small id="authorsInput" class="text-muted">Вводите через запятую</small>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>