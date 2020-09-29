import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import BookCreate from '@/views/books/entity/BookCreate.vue';

describe('BookCreate.vue', () => {
    it('Renders dates', async () => {
        const wrapper = shallowMount(BookCreate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        status: 1
                    }
                }
            }
        });

        expect(wrapper.vm.book.status).equal(1);

        wrapper.vm.book.status = 0;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(false);
        expect(wrapper.find('.end-date').isVisible()).equal(false);

        wrapper.vm.book.status = 1;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(true);
        expect(wrapper.find('.end-date').isVisible()).equal(false);

        wrapper.vm.book.status = 2;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(true);
        expect(wrapper.find('.end-date').isVisible()).equal(true);
    })
})