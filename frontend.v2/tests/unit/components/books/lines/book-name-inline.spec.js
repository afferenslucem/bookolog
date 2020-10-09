import { expect } from 'chai'
import books from '../../../data/books'
import { shallowMount } from '@vue/test-utils'
import BookInlineHeader from '@/components/book-module/book/BookInlineHeader.vue';
import ShouldSyncIcon from "@/components/icons/ShouldSyncIcon.vue";
import Vue from 'vue'

Vue.component('ShouldSyncIcon', ShouldSyncIcon);

describe('BookInlineHeader.vue', () => {
    it('Renders props.book.name', () => {
        const book = Object.assign({}, books[8]);
        book.shouldSync = true;

        const wrapper = shallowMount(BookInlineHeader, {
            propsData: { book }
        })
        expect(wrapper.html()).to.include(book.name)
    })

    it('Renders sync icon', () => {
        const book = Object.assign({}, books[8]);
        book.shouldSync = true;

        const wrapper = shallowMount(BookInlineHeader, {
            propsData: { book }
        })
        expect(wrapper.find('i').exists()).to.equal(true)
    })

    it('Dont renders sync icon', () => {
        const book = Object.assign({}, books[8]);

        book.shouldSync = undefined;

        const wrapper = shallowMount(BookInlineHeader, {
            propsData: { book }
        })

        expect(wrapper.find('.shouldSync').exists()).to.equal(false)
    })
})
