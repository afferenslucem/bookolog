<template>
    <div>
        <div>
            <reading-list class="no-index" :name="'Список читаемых книг'" :books="inProgress"></reading-list>
        </div>
        <div class="mt-5">
            <book-list-historical class="no-index" :name="'Список прочитанных книг'" :bookYearList="done"></book-list-historical>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ReadingList from '@/components/common/BookList.vue';
    import BookListHistorical from '@/components/common/BookListHistorical.vue';
    import booksMixin from '@/mixins/books';

    export default Vue.extend({
        components: { ReadingList, BookListHistorical },
        mixins: [booksMixin]
    })
</script>

<style lang="scss" scoped>

</style>