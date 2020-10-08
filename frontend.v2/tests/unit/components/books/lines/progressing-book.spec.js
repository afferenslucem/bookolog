import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import ProgressingBook from '@/components/book-module/book/ProgressingBook.vue';

import Vue from 'vue';

import join from '@/filters/join'

Vue.filter('join', join);

describe('ProgressingBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`book-inline-header-stub`)
    })

    it('Render props.book.authors', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Александр Пикуленко,Денис Орлов"></no-wrap-values-stub>`)
    })

    it('Render props.book.authors', () => {
        const book = books[6];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Джордж Мартин"></no-wrap-values-stub>`)
    })

    it('Render props.book.progress', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="50"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[8];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[9];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[10];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[11];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })

    it('Render empty props.book.progress', () => {
        const book = books[12];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<progress-bar-stub progress="0"></progress-bar-stub>`)
    })
})