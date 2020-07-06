<template>
    <div>
        <div>
            <reading-list class="no-index" :name="'Список читаемых книг'" :books="inProgress"></reading-list>
        </div>
        <div class="mt-5">
            <reading-list class="no-index" :name="'Список прочитанных книг'" :books="done"></reading-list>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ReadingList from '@/components/common/BookList.vue';
    import booksMixin from '@/mixins/books';

    export default Vue.extend({
        components: { ReadingList },
        mixins: [booksMixin]
    })
</script>

<style lang="scss" scoped>

</style>