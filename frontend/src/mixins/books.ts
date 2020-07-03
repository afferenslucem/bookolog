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
            return this.booksStorage.toRead;
        },
        inProgress(): Book[] {
            return this.booksStorage.inProgress;
        },
        done(): Book[] {
            return this.booksStorage.done;
        }
    }
});