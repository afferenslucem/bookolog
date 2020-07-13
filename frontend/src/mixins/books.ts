import Vue from 'vue';
import { BooksModule, Book, BookYearList } from '@/types/books-module';
import _ from 'underscore'

export default Vue.extend({
    computed: {
        booksStorage(): BooksModule {
            return this.$store.state.booksStorage;
        },
        books(): Book[] {
            return this.booksStorage.books;
        },
        toRead(): Book[] {
            const result = this.$store.getters.toReadBooks;

            return result;
        },
        inProgress(): Book[] {
            return this.$store.getters.inProgressBooks;
        },
        done(): BookYearList[] {
            const books = this.$store.getters.doneBooks;

            const groupedList = _.groupBy(books, (item: Book) => item.endYear || 'Неопределенное время');

            const lists = _.map(groupedList, (value, key) => { return { year: key, books: value } });

            lists.sort((a, b) => {
                if(!Number(a.year)) return 1;
                if(!Number(b.year)) return -1;

                return Number(b.year) - Number(a.year);
            });

            lists.forEach(item => {
                item.books.sort((a: Book, b: Book) => this.compareBooks(a, b))
            })

            return Array.from<any>(lists);
        }
    },
    methods: {
        compareBooks(a: Book, b: Book): number {
            if(!a.endYear && b.endYear) return 1;
            if(a.endYear && !b.endYear) return -1;
            if(!a.endYear && !b.endYear) return 0;

            const year = b.endYear - a.endYear;

            if(year) return year;

            if(!a.endMonth && b.endMonth) return 1;
            if(a.endMonth && !b.endMonth) return -1;
            if(!a.endMonth && !b.endMonth) return 0;

            const month = b.endMonth - a.endMonth;

            if(month) return month;
            
            if(!a.endDay && b.endDay) return 1;
            if(a.endDay && !b.endDay) return -1;
            if(!a.endDay && !b.endDay) return 0;

            return b.endDay - a.endDay;
        }
    }
});