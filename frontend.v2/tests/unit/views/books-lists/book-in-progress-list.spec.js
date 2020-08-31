import { expect } from 'chai'
import books from '../../data/books'
import { shallowMount } from '@vue/test-utils'
import BooksInProgressList from '@/views/books/lists/BooksInProgressList.vue';
import { BOOKS_IN_PROGRESS_GETTER } from "@/store/naming";
import {IN_PROGRESS_STATUS} from '@/models/book';
import ProgressingBook from '@/components/book/ProgressingBook.vue';
import _ from 'declarray';

describe('BooksInProgressList.vue', () => {
    let wrapper = null;

    const progressBooks = _(books).where(item => item.status === IN_PROGRESS_STATUS).orderByDescending(item => item.modifyTime || '0').thenByDescending(item => item.name).toArray();

    const $store = {
        getters: {
            [BOOKS_IN_PROGRESS_GETTER]: progressBooks
        }
    }

    beforeEach(() => {
         wrapper = shallowMount(BooksInProgressList, {
            mocks: { 
                $store
             }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(ProgressingBook);
        expect(items.length).to.equal(8)
    })

    it('Compare books', () => {
        const items = wrapper.findAllComponents(ProgressingBook);

        for(let i = 0; i < progressBooks.length; i++) {
            const item = items.at(i);
            expect(item.props().book.name).to.equal(progressBooks[i].name);
        }
    })

    it('Should show empty list message', () => {
        wrapper = shallowMount(BooksInProgressList, {
            mocks: { 
                $store: {
                    getters: {
                        [BOOKS_IN_PROGRESS_GETTER]: []
                    }
                }
             }
        })

        const items = wrapper.findAllComponents(ProgressingBook);
        expect(items.length).to.equal(0);

        expect(wrapper.text()).contains('Здесь пока ничего нет.');
    })
})
