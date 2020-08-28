import { expect } from 'chai'
import books from '../../data/books'
import { shallowMount } from '@vue/test-utils'
import BooksDoneList from '@/views/books/lists/BooksDoneList.vue';
import { BOOKS_DONE_GETTER } from "@/store/naming";
import {DONE_STATUS} from '@/models/book';
import DoneBook from '@/components/book/DoneBook.vue';
import _ from 'declarray';

describe('BookDoneList.vue', () => {
    let wrapper = null;

    const doneBooks = _(books).where(item => item.status === DONE_STATUS).toArray();

    const $store = {
        getters: {
            [BOOKS_DONE_GETTER]: doneBooks
        }
    }

    beforeEach(() => {
         wrapper = shallowMount(BooksDoneList, {
            mocks: { 
                $store
             }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(3)
    })

    it('Compare books', () => {
        const items = wrapper.findAllComponents(DoneBook);

        for(let i = 0; i < doneBooks.length; i++) {
            const item = items.at(i);
            expect(item.props().book.name).to.equal(doneBooks[i].name);
        }
    })

    it('Should show empty list message', () => {
        wrapper = shallowMount(BooksDoneList, {
            mocks: { 
                $store: {
                    getters: {
                        [BOOKS_DONE_GETTER]: []
                    }
                }
             }
        })

        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(0);

        expect(wrapper.text()).contains('Здесь пока ничего нет.');
    })
})
