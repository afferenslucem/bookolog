<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {BookClient} from '@/http/book-client';
export default {
  async created() {
    const books = await new BookClient().get();

    console.log(books);
  },
}
</script>

<style lang="scss">
  @import 'styles';
</style>
