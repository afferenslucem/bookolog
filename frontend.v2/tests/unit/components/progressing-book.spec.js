import { expect } from 'chai'
import books from '../data/books'
import { shallowMount } from '@vue/test-utils'
import ProgressingBook from '@/components/book/ProgressingBook.vue';
import moment from 'moment';

describe('ProgressingBook.vue', () => {
    it('renders props.book.year when exists', () => {
        const book = books[5];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Год издания: ${book.year}`)
    })

    it('Doesn\'t render props.book.year when not exists', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.not.include(`Год издания: `)
    })

    it('renders props.book.startDate when exists', () => {
        const book = books[5];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Начата: ${moment(book.startDate).format('lll')}`)
    })

    it('Doesn\'t render props.book.startDate when not exists', () => {
        const book = books[6];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.not.include(`Начата: `)
    })

    it('renders props.book.genre when exists', () => {
        const book = books[4];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Жанр: ${book.genre}`)
    })

    it('Doesn\'t render props.book.genre when not exists', () => {
        const book = books[5];
        const wrapper = shallowMount(ProgressingBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.not.include(`Жанр: `)
    })
})
