import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import DoneBook from '@/components/book-module/book/DoneBook.vue';
import moment from 'moment';
import Vue from 'vue';

import join from '@/filters/join'

Vue.filter('join', join);

describe('DoneBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`book-inline-header-stub`)
    })

    it('Render props.book.authors', () => {
        const book = books[2];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Марк Аврелий"></no-wrap-values-stub>`)
    })

    it('Render props.book.authors', () => {
        const book = books[3];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.include(`<no-wrap-values-stub values="Николай Костомаров,Михаил Галустян"></no-wrap-values-stub>`)
    })

    it('Render no props.book.progress', () => {
        const book = books[3];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.not.include(`<progress-bar-stub`)
    })

    it('Render props.book.startDate and props.book.endDate', () => {
        const book = books[2];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.not.include(`<progress-bar-stub`)
    })

    it('Render props.book.startDate', () => {
        const book = books[13];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.not.include(`[ ${moment(book.startDate).format('ll')} - ... ]`)
    })

    it('Render props.book.endDate', () => {
        const book = books[14];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.not.include(`[ ... - ${moment(book.endDate).format('ll')} ]`)
    })

    it('Render no dates', () => {
        const book = books[15];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.html()).to.not.include('<div class="date-range')
    })
})