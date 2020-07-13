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
               return this.book.startYear || this.book.endYear;
           },
           startDate(): number[] {
               const year = this.book.startYear;
               const month = this.book.startMonth;
               const day = this.book.startDay;

               return [year, month, day];
           },
           endDate(): number[] {
               const year = this.book.endYear;
               const month = this.book.endMonth;
               const day = this.book.endDay;

               return [year, month, day];
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
           date(items: number[]): string {
               function format(item: number): string {
                   if(item < 10) {
                       return `0${item}`;
                   } else {
                       return item.toString();
                   }
               }

               if (!items[0]) {
                   return '...'
               } else if (!items[1]) {
                   return `${items[0]}-...`
               } else if (!items[2]) {
                   return `${items[0]}-${format(items[1])}-...`
               } else {
                   return `${items[0]}-${format(items[1])}-${format(items[2])}`
               }
           }
       }
    })
</script>

<style lang="scss" scoped>

</style>