import { expect } from 'chai'
import books from '../../data/books'
import { shallowMount } from '@vue/test-utils'
import BooksByTagList from '@/views/books/lists/BooksByTagList.vue';
import { BOOKS_DONE_GETTER } from "@/store/naming";
import {DONE_STATUS} from '@/models/book';
import _ from 'declarray';

describe('BooksByTagList.vue', () => {
    let wrapper = null;

    const doneBooks = _(books).where(item => item.status === DONE_STATUS).toArray();

    const $store = {
        getters: {
            [BOOKS_DONE_GETTER]: doneBooks
        }
    }

    beforeEach(() => {
         wrapper = shallowMount(BooksByTagList, {
            mocks: { 
                $store,
                $route: {
                    params: {
                        name: "физика"
                    }
                },
                $t: () => ''
             }
        })
    });

    it('books getter test', () => {
        const items = wrapper.vm.books;
        expect(items.length).to.equal(1);
        expect(items[0].name).to.equal("Занимательная физика");
    })
})
