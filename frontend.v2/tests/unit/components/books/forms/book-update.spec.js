import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import BookUpdate from '@/views/books/entity/BookUpdate.vue';

describe('BookUpdate.vue', () => {
    it('Renders dates', async () => {
        const wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                }
            }
        });

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