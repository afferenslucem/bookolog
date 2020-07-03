import axios from 'axios';
import { StoreOptions } from 'vuex';
import { UserModule } from '@/types/user-module';
import { BookResponse } from '@/types/books-module';

const userModule = {  
    state: {
        loggedIn: false
    },
    mutations: {
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        }
    },
    actions: {
        async login({commit}): Promise<void> {
            const answer = await axios.get<BookResponse>('/books.json');

            const books = answer.data.books;

            commit('pushBooks', books);

            commit('login');
        },
        logout({commit}): void {
            commit('logout');
        }
    }
} as StoreOptions<UserModule>;

export default userModule;