<template>
  <book-list :items="toRead" :listName="'Список к прочтению'"></book-list>
</template>

<script lang="ts">
    import Vue from 'vue';
    import BookList from '@/components/common/BookList.vue';

    import booksMixin from '@/mixins/books';

    export default Vue.extend({
        components: { BookList },
        mixins: [booksMixin]
    })
</script>

<style lang="scss" scoped>

</style>