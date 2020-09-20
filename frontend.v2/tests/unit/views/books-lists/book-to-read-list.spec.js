import { expect } from 'chai'
import books from '../../data/books'
import { shallowMount } from '@vue/test-utils'
import BooksToReadList from '@/views/books/lists/BooksToReadList.vue';
import { BOOKS_TO_READ_GETTER } from "@/store/naming";
import {TO_READ_STATUS} from '@/models/book';
import ToReadBook from '@/components/book-module/book/ToReadBook.vue';
import _ from 'declarray';

describe('BooksToReadList.vue', () => {
    let wrapper = null;

    const progressBooks = _(books).where(item => item.status === TO_READ_STATUS).orderByDescending(item => item.modifyDate || '0').thenByDescending(item => item.name).toArray();

    const $store = {
        getters: {
            [BOOKS_TO_READ_GETTER]: progressBooks
        }
    }

    beforeEach(() => {
         wrapper = shallowMount(BooksToReadList, {
            mocks: { 
                $store,
                $t: () => ''
             }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(ToReadBook);
        expect(items.length).to.equal(6)
    })

    it('Compare books', () => {
        const items = wrapper.findAllComponents(ToReadBook);

        for(let i = 0; i < progressBooks.length; i++) {
            const item = items.at(i);
            expect(item.props().book.name).to.equal(progressBooks[i].name);
        }
    })

    it('Should show empty list message', () => {
        wrapper = shallowMount(BooksToReadList, {
            mocks: { 
                $store: {
                    getters: {
                        [BOOKS_TO_READ_GETTER]: []
                    }
                },
                $t: () => 'Здесь пока ничего нет.'
             }
        })

        const items = wrapper.findAllComponents(ToReadBook);
        expect(items.length).to.equal(0);

        expect(wrapper.text()).contains('Здесь пока ничего нет.');
    })
})
