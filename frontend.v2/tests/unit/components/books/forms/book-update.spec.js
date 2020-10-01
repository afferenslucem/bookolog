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

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
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

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(null);

        wrapper.find('#status').setValue(2);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(null);
    })
    
    
    it('Should return valid form after create', async () => {        
        wrapper.vm.book.name = 'name';
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.formValid).equal(true);
        expect(wrapper.vm.nameValid).equal(true);

        expect(wrapper.find('.submit').attributes().disabled).equal(undefined);     

        wrapper.vm.book.name = '';
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.formValid).equal(false);
        expect(wrapper.vm.nameValid).equal(false);

        expect(wrapper.find('.submit').attributes().disabled).equal('disabled');
    })
    
    it('Should return invalid units', async () => {
        wrapper.vm.book.name = 'name';
        wrapper.vm.book.status = 1;

        wrapper.vm.book.doneUnits = 88;
        wrapper.vm.book.totalUnits = 44;

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showProgress).equal(true);
        expect(wrapper.vm.unitsValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);
        expect(wrapper.find('.progress-row').classes()).to.contains('is-invalid');

        wrapper.vm.book.doneUnits = 44;
        wrapper.vm.book.totalUnits = 88;
        
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.unitsValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
        expect(wrapper.find('.progress-row').classes()).not.contains('is-invalid');
    });
    
    it('Should return invalid dates', async () => {
        wrapper.vm.book.name = 'name';
        wrapper.vm.book.status = 2;

        wrapper.vm.book.endDateYear = 2018;
        wrapper.vm.book.startDateYear = 2020;

        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');
        
        wrapper.vm.book.status = 1;
        
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
        
        wrapper.vm.book.status = 2;
        
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);
        
        wrapper.vm.book.endDateYear = 2020;
        wrapper.vm.book.startDateYear = 2020;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');        
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
        
        wrapper.vm.book.endDateMonth = 7;
        wrapper.vm.book.startDateMonth = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');        
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);
        
        wrapper.vm.book.endDateMonth = 9;
        wrapper.vm.book.startDateMonth = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');        
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
        
        wrapper.vm.book.endDateDay = 7;
        wrapper.vm.book.startDateDay = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');        
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);
        
        wrapper.vm.book.endDateDay = 10;
        wrapper.vm.book.startDateDay = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');        
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
    });
})