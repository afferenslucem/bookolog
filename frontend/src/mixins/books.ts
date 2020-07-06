import Vue from 'vue';
import { BooksModule, Book } from '@/types/books-module';

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
        done(): Book[] {
            return this.$store.getters.doneBooks;
        }
    },
});