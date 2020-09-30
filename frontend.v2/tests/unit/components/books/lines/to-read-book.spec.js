import { expect } from 'chai'
import books from '../../../data/books'
import { shallowMount } from '@vue/test-utils'
import ToReadBook from '@/components/book-module/book/ToReadBook.vue';
import Vue from 'vue';

import join from '@/filters/join'

Vue.filter('join', join);

describe('ProgressingBook.vue', () => {
    // it('Render props.book.name', () => {
    //     const book = books[2];
    //     const wrapper = shallowMount(ToReadBook, {
    //         propsData: { book }
    //     })
    //     expect(wrapper.text()).to.include(`Наедене с собой`)
    // })

    it('Render props.book.authors', () => {
        const book = books[16];
        const wrapper = shallowMount(ToReadBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Андрей Круз, Андрей Царев`)
    })

    it('Render props.book.authors', () => {
        const book = books[2];
        const wrapper = shallowMount(ToReadBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Марк Аврелий`)
    })
})
