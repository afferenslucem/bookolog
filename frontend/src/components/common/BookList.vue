<template>
    <div>
        <div class="list book-list">
            <div class="header">
                <h2>{{name}}</h2>
            </div>
            <div class="body">
                <div class="list-line" v-for="(item, index) in books" :key="item.id">
                    <span class="index">        
                        {{index + 1}}.
                    </span>
                    <app-book :book="item"></app-book>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppBook from '@/components/entities/Book.vue';
import { Book } from '../../types/books-module';

    export default Vue.extend({
        components: { AppBook },
        props: {
           books: {
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

<style lang="scss" scoped>

</style>