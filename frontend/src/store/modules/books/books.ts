import { StoreOptions } from 'vuex';
import { BooksModule } from '@/types/books-module';
import { state, mutations, getters, actions } from './storage-methods';

const booksModule = {  
    state,
    mutations,
    actions,
    getters,
} as StoreOptions<BooksModule>;

export default booksModule;