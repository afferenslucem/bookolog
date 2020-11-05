import { expect } from 'chai'
import books from '../../../data/books'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import BookHeader from '@/components/book/book/BookHeader.vue';
import ShouldSyncIcon from "@/components/icon/ShouldSyncIcon.vue";

Vue.component('ShouldSyncIcon', ShouldSyncIcon);

describe('BookHeader.vue', () => {
    it('Renders props.book.name', () => {
        const book = Object.assign({}, books[8]);
        book.shouldSync = true;

        const wrapper = shallowMount(BookHeader, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(book.name)
    })

    it('Renders sync icon', () => {
        const book = Object.assign({}, books[8]);
        book.shouldSync = true;

        const wrapper = shallowMount(BookHeader, {
            propsData: { book }
        })
        expect(wrapper.find('i').exists()).to.equal(true)
    })

    it('Dont renders sync icon', () => {
        const book = Object.assign({}, books[8]);

        book.shouldSync = undefined;

        const wrapper = shallowMount(BookHeader, {
            propsData: { book }
        })
        expect(wrapper.find('i').exists()).to.equal(false)
    })
})
