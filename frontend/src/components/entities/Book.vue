<template>
    <div class="book">
        <div class="name"><strong>{{book.name}}</strong></div>
        <div class="authors">{{authors}}</div>

        <div v-show="showProgress" class="progress">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div v-show="showDate && hasDate" class="date-range">
            [
                <span class="date">
                    {{startDate}}
                </span>
                -
                <span class="date">
                    {{endDate}}
                </span>
            ]
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Book, Status as BookStatus } from '@/types/books-module'

    export default Vue.extend({
       props: {
           book: {
               type: Object,
               required: true
           }
       },
       computed: {
           authors(): string {
               return this.book.authors.join(', ');
           },
           showDate(): boolean {
               return this.book.status != BookStatus.toRead;
           },
           hasDate(): boolean {
               return this.book.startDate || this.book.endDate;
           },
           startDate(): string {
               return this.book.startDate ? this.book.startDate : '...';
           },
           endDate(): string {
               return this.book.endDate ? this.book.endDate : '...';
           },
           showProgress(): boolean {
               return this.book.status == BookStatus.inProgress;
           },
           progress(): number {
               return this.book.progress | 0;
           },
           progressStyle(): any {
               return {
                   'width': `${this.progress}%`
               }
           }
       }
    })
</script>

<style lang="scss" scoped>

</style>