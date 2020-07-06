<template>
  <reading-list :name="'Список к прочтению'" :books="toRead"></reading-list>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ReadingList from '@/components/common/BookList.vue';

    import booksMixin from '@/mixins/books';

    export default Vue.extend({
        components: { ReadingList },
        mixins: [booksMixin]
    })
</script>

<style lang="scss" scoped>

</style>