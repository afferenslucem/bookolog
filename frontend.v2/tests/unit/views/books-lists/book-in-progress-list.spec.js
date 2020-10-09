import { expect } from 'chai'
import books from '../../data/books'
import { shallowMount } from '@vue/test-utils'
import BooksInProgressList from '@/views/books/lists/BooksInProgressList.vue';
import { BOOKS_IN_PROGRESS_GETTER } from "@/store/naming";
import {IN_PROGRESS_STATUS} from '@/models/book';
import _ from 'declarray';
import ProgressingBook from '@/components/book-module/book/ProgressingBook.vue';
import ProgressBar from '@/components/book-module/book/ProgressBar.vue'; 
import BookInlineHeader from "@/components/book-module/book/BookInlineHeader.vue";
import NoWrapValues from "@/components/book-module/book/NoWrapValues.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import ShouldSyncIcon from "@/components/icons/ShouldSyncIcon.vue";
import Vue from 'vue';

Vue.component('ProgressBar', ProgressBar);
Vue.component('BookInlineHeader', BookInlineHeader);
Vue.component('NoWrapValues', NoWrapValues);
Vue.component('EditIcon', EditIcon);
Vue.component('ShouldSyncIcon', ShouldSyncIcon);
Vue.component('ProgressingBook', ProgressingBook);

describe('BooksInProgressList.vue', () => {
    let wrapper = null;

    const progressBooks = _(books).where(item => item.status === IN_PROGRESS_STATUS).orderByDescending(item => item.modifyDate || '0').thenByDescending(item => item.name).toArray();

    const $store = {
        getters: {
            [BOOKS_IN_PROGRESS_GETTER]: progressBooks
        }
    }

    beforeEach(() => {
         wrapper = shallowMount(BooksInProgressList, {
            mocks: { 
                $store,
                $t: () => ''
             }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(ProgressingBook);
        expect(items.length).to.equal(8)
    })

    it('Should show empty list message', () => {
        wrapper = shallowMount(BooksInProgressList, {
            mocks: { 
                $store: {
                    getters: {
                        [BOOKS_IN_PROGRESS_GETTER]: []
                    }
                },
                $t: () => 'Здесь пока ничего нет.'
             }
        })

        const items = wrapper.findAllComponents(ProgressingBook);
        expect(items.length).to.equal(0);

        expect(wrapper.text()).contains('Здесь пока ничего нет.');
    })
})
