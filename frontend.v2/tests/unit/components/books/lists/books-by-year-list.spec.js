import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import BooksByYearsList from "@/components/book-module/books-lists/BooksByYearsList";
import {
    DONE_STATUS
} from '@/models/book';
import DoneBook from '@/components/book-module/book/DoneBook.vue';
import _ from 'declarray';
import Vue from 'vue';

import capitalFirst from '@/filters/capital-first'
Vue.filter('capital', capitalFirst);

describe('BooksByYearsList.vue', () => {
    let wrapper = null;

    const doneBooks = _(books).where(item => item.status === DONE_STATUS).toArray();

    beforeEach(() => {
        wrapper = shallowMount(BooksByYearsList, {
            propsData: {
                books: doneBooks,
                listname: 'ListName'
            },
            mocks: {
                $t: () => ''
            }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(3)
    })

    it('Render name', () => {
        expect(wrapper.text()).to.include('ListName')
    })

    it('Compare books', () => {
        const items = wrapper.findAllComponents(DoneBook);

        for (let i = 0; i < doneBooks.length; i++) {
            const item = items.at(i);
            expect(item.props().book.name).to.equal(doneBooks[i].name);
        }
    })

    it('Should show empty list', () => {
        wrapper = shallowMount(BooksByYearsList, {
            propsData: {
                books: []
            },
            mocks: {
                $t: () => ''
            }
        })

        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(0);
    })
})