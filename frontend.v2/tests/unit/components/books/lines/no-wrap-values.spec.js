import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import NoWrapValues from '@/components/book-module/book/NoWrapValues.vue';

describe('BookHeader.vue', () => {
    it('Renders one value', () => {
        const values = ['one']

        const wrapper = shallowMount(NoWrapValues, {
            propsData: { values }
        })

        expect(wrapper.text()).to.include('one')
    })

    it('Renders two values', () => {
        const values = ['one', 'two']

        const wrapper = shallowMount(NoWrapValues, {
            propsData: { values }
        })

        expect(wrapper.text()).to.include('one, two')
    })

    it('Renders three values', () => {
        const values = ['one', 'two', 'three']

        const wrapper = shallowMount(NoWrapValues, {
            propsData: { values }
        })

        expect(wrapper.text()).to.include('one, two, three')
    })
})
