<template>
    <div class="book">
        <div class="name">
            <strong>{{book.name}}</strong>
            <router-link class="edit" :to="{name: 'BookForm', params: { action: 'edit', id: this.book.id }}">
                [редактировать]
            </router-link>
        </div>
        <div class="authors">{{authors}}</div>

        <div v-show="showProgress" class="progress">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div v-show="showDate && hasDate" class="date-range">
            [
                <span class="date">
                    {{startDate | date}}
                </span>
                -
                <span class="date">
                    {{endDate | date}}
                </span>
            ]
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Book, Status as BookStatus } from '@/types/books-module'
    import moment from 'moment';

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
           startDate(): Date {
               return this.book.StartDate;
           },
           endDate(): Date {
               return this.book.EndDate;
           },
           showProgress(): boolean {
               return this.book.status == BookStatus.inProgress;
           },
           progress(): number {
               return this.book.progressPercent || 0;
           },
           progressStyle(): any {
               return {
                   'width': `${this.progress}%`
               }
           }
       },
       filters: {
           date(date: Date): string {
               if(date == null) {
                   return '...';
               } else {
                   return moment(date).format('L');
               }
           }
       }
    })
</script>

<style lang="scss" scoped>

</style>