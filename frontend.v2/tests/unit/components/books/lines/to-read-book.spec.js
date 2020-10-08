import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import ToReadBook from '@/components/book-module/book/ToReadBook.vue';
import Vue from 'vue';

import join from '@/filters/join'

Vue.filter('join', join);

describe('ToReadBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(ToReadBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`book-inline-header-stub`)
    })

    it('Render props.book.authors', () => {
        const book = books[16];
        const wrapper = shallowMount(ToReadBook, {
            propsData: {
                book
            }
        })
        
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Андрей Круз,Андрей Царев"></no-wrap-values-stub>`)
    })

    it('Render props.book.authors', () => {
        const book = books[2];
        const wrapper = shallowMount(ToReadBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Марк Аврелий"></no-wrap-values-stub>`)
    })
})