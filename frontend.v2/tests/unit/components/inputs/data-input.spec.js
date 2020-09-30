import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import DateInput from '@/components/inputs/BookDateInput'//'@/components/inputs/BookDateInput.vue';

describe('BookDataInput.vue', () => {
    it('Renders empty props for nulls', () => {
        const component = new shallowMount(DateInput, {
            propsData: {
                day: null,
                month: null,
                year: null
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.year').element.value).equal('');
        expect(component.find('.month').element.value).equal('');
        expect(component.find('.day').element.value).equal('');
    });

    it('Renders filled props for props', () => {
        const component = new shallowMount(DateInput, {
            propsData: {
                day: 23,
                month: 9,
                year: 2020
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.year').element.value).equal('2020');
        expect(component.find('.month').element.value).equal('9');
        expect(component.find('.day').element.value).equal('23');
    });

    it('Emit input value', async () => {
        const component = new shallowMount(DateInput, {
            propsData: {
                day: null,
                month: null,
                year: null
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.vm.enabledMonth).equal(false);
        expect(component.vm.enabledDay).equal(false);

        component.find('.year').setValue(2020);
        component.find('.year').trigger('blur');
        expect(component.emitted()['update:year'][0]).deep.equal([2020]);
        expect(component.emitted()['change'][0]).deep.equal([[2020, null, null]]);

        await component.vm.$nextTick()

        expect(component.vm.enabledMonth).equal(true);
        expect(component.find('.month').attributes().disabled).equal(undefined);
        component.find('.month').setValue(9);
        component.find('.month').trigger('blur');
        expect(component.emitted()['update:month'][0]).deep.equal([9]);
        expect(component.emitted()['change'][1]).deep.equal([[2020, 9, null]]);

        await component.vm.$nextTick()

        expect(component.vm.enabledDay).equal(true);
        expect(component.find('.day').attributes().disabled).equal(undefined);
        component.find('.day').setValue(25);
        component.find('.day').trigger('blur');
        expect(component.emitted()['update:day'][0]).deep.equal([25]);
        expect(component.emitted()['change'][2]).deep.equal([[2020, 9, 25]]);
    });

    it('Should reset for invalid years', () => {
        const component = new shallowMount(DateInput, {
            propsData: {
                day: 23,
                month: 9,
                year: 2020
            },
            mocks: {
                $t: () => {}
            }
        });

        component.find('.year').setValue('');
        component.find('.year').trigger('blur');
        
        expect(component.emitted()['update:year'][0]).deep.equal([null]);        
        expect(component.emitted()['update:month'][0]).deep.equal([null]);        
        expect(component.emitted()['update:day'][0]).deep.equal([null]);

        expect(component.emitted()['change'][0]).deep.equal([[null, null, null]]);
        
        expect(component.vm.cleanYear).equal(null);
        expect(component.vm.cleanMonth).equal(null);
        expect(component.vm.cleanDay).equal(null);
        
        expect(component.vm.enabledMonth).equal(false);
        expect(component.vm.enabledDay).equal(false);
    });

    it('Should reset for invalid month', () => {
        const component = new shallowMount(DateInput, {
            propsData: {
                day: 23,
                month: 9,
                year: 2020
            },
            mocks: {
                $t: () => {}
            }
        });

        component.find('.month').setValue('');
        component.find('.month').trigger('blur');
         
        expect(component.emitted()['update:month'][0]).deep.equal([null]);        
        expect(component.emitted()['update:day'][0]).deep.equal([null]);

        expect(component.emitted()['change'][0]).deep.equal([[2020, null, null]]);
        
        expect(component.vm.cleanMonth).equal(null);
        expect(component.vm.cleanDay).equal(null);
        
        expect(component.vm.enabledDay).equal(false);
    });
});