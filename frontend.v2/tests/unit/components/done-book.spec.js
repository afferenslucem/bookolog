import { expect } from 'chai'
import books from '../data/books'
import { shallowMount } from '@vue/test-utils'
import DoneBook from '@/components/book/DoneBook.vue';
import moment from 'moment';

describe('DoneBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Война миров`)
    })

    it('Render props.book.authors', () => {
        const book = books[2];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`Марк Аврелий`)
    })

    it('Render props.book.authors', () => {
        const book = books[3];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.text()).to.include(`[\n  "Николай Костомаров",\n  "Михаил Галустян"\n]`)
    })

    it('Render no props.book.progress', () => {
        const book = books[3];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.not.include(`<progress-bar-stub`)
    })

    it('Render props.book.startDate and props.book.endDate', () => {
        const book = books[2];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.not.include(`<progress-bar-stub`)
    })

    it('Render props.book.startDate', () => {
        const book = books[13];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.not.include(`[ ${moment(book.startDate).format('ll')} - ... ]`)
    })

    it('Render props.book.endDate', () => {
        const book = books[14];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.not.include(`[ ... - ${moment(book.endDate).format('ll')} ]`)
    })

    it('Render no dates', () => {
        const book = books[15];
        const wrapper = shallowMount(DoneBook, {
            propsData: { book }
        })
        expect(wrapper.html()).to.not.include('<div class="date-range')
    })
})
