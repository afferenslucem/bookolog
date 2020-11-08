import {
    expect
} from 'chai'
import books from '../../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import DoneBook from '@/components/book/book/DoneBook.vue';
import moment from 'moment';
import Vue from 'vue';
import BookInlineHeader from "@/components/book/book/BookInlineHeader.vue";
import NoWrapValues from "@/components/book/book/NoWrapValues.vue";
import EditIcon from "@/components/icon/EditIcon.vue";
import ShouldSyncIcon from "@/components/icon/ShouldSyncIcon.vue";
import dateFormat from '@/filters/format-date'

Vue.filter('dateFormat', dateFormat);
Vue.component('BookInlineHeader', BookInlineHeader);
Vue.component('NoWrapValues', NoWrapValues);
Vue.component('EditIcon', EditIcon);
Vue.component('ShouldSyncIcon', ShouldSyncIcon);

describe('DoneBook.vue', () => {
    it('Render props.book.name', () => {
        const book = books[0];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.name)
    })

    it('Render props.book.authors', () => {
        const book = books[2];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.authors.join(', '))
    })

    it('Render props.book.authors', () => {
        const book = books[3];
        const wrapper = shallowMount(DoneBook, {
            propsData: {
                book
            }
        })
        expect(wrapper.text()).to.include(book.authors.join(', '))
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
        expect(wrapper.html()).to.not.include('<div class="book-line__date-range')
    })
})
