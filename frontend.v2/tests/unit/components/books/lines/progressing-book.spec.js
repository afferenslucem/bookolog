import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
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


describe('ProgressingBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.name)
    })

    it('Render props.book.authors', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.authors.join(', '))
    })

    it('Render props.book.authors', () => {
        const book = books[6];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.authors.join(', '))
    })

    it('Render props.book.progress', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`aria-valuenow="50"`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[9];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`aria-valuenow="0"`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[10];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`aria-valuenow="0"`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[12];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`aria-valuenow="0"`)
    })
})