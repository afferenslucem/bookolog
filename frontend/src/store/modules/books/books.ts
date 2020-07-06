import { StoreOptions } from 'vuex';
import { BooksModule } from '@/types/books-module';
import { state, mutations, getters } from './storage-methods';

const booksModule = {  
    state,
    mutations,
    getters,
} as StoreOptions<BooksModule>;

export default booksModule;