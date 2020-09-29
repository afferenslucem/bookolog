import { expect } from 'chai'
import books from '../../../data/books'
import { shallowMount } from '@vue/test-utils'
import ProgressingBook from '@/components/book-module/book/ProgressingBook.vue';

import Vue from 'vue';

import join from '@/filters/join'

Vue.filter('join', join);

describe('ProgressingBook.vue', () => {
    it('Render props.book.authors', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Александр Пикуленко, Денис Орлов`)
    })

    it('Render props.book.authors', () => {
        const book = books[6];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Джордж Мартин`)
    })

    it('Render props.book.progress', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="50"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[8];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[9];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[10];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[11];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[12];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })
})
