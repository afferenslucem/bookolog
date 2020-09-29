import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import BookUpdate from '@/views/books/entity/BookUpdate.vue';

describe('BookUpdate.vue', () => {
    let wrapper = null;
    beforeEach(async () => {
        wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                }
            }
        });
    })

    it('Renders dates', async () => {
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

    it('Prefill dates for new done status', async () => {
        wrapper.vm.initialStatus = 1;
        wrapper.vm.initialUnits = 10;

        wrapper.vm.book.totalUnits = 100;
        wrapper.vm.book.doneUnits = 10;

        expect(wrapper.vm.book.endDateYear).equal(undefined);
        expect(wrapper.vm.book.endDateMonth).equal(undefined);
        expect(wrapper.vm.book.endDateDay).equal(undefined);
        expect(wrapper.vm.book.doneUnits).equal(10);

        wrapper.find('#status').setValue(2);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(new Date().getFullYear());
        expect(wrapper.vm.book.endDateMonth).equal(new Date().getMonth() + 1);
        expect(wrapper.vm.book.endDateDay).equal(new Date().getDate());
        expect(wrapper.vm.book.doneUnits).equal(100);

        wrapper.find('#status').setValue(1);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(10);
    })

    it('Prefill dates for new done status', async () => {
        wrapper.vm.initialStatus = 2;

        expect(wrapper.vm.book.endDateYear).equal(undefined);
        expect(wrapper.vm.book.endDateMonth).equal(undefined);
        expect(wrapper.vm.book.endDateDay).equal(undefined);
        expect(wrapper.vm.book.doneUnits).equal(undefined);

        wrapper.find('#status').setValue(2);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(undefined);
        expect(wrapper.vm.book.endDateMonth).equal(undefined);
        expect(wrapper.vm.book.endDateDay).equal(undefined);
        expect(wrapper.vm.book.doneUnits).equal(undefined);
    })
})