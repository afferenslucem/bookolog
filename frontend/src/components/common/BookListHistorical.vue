<template>
    <div>
        <div class="list book-year-list">
            <div class="header">
                <h2>{{name}}</h2>
            </div>
            <div class="body">
                <app-book-list class="list-line year" v-for="item in bookYearList" :key="item.year" :name="item.year.toString()" :books="item.books"></app-book-list>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppBook from '@/components/entities/Book.vue';
    import AppBookList from '@/components/common/BookList.vue';
    import { Book } from '../../types/books-module';

    export default Vue.extend({
        components: { AppBookList },
        props: {
           bookYearList: {
               type: Array,
               required: true
           },
           name: {
               type: String,
               required: true
           }
       },
    
    })
</script>

<style lang="scss">
    .year {
        .header {
            h2 {
                font-size: 1.5rem;
            }
        }   
    }
</style>

<style lang="scss" scoped>
    .list-line.year {
        margin-bottom: 2.5rem;
    }
</style>