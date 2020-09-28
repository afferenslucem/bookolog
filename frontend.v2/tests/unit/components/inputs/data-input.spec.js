import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import DateInput from '../../../../src/components/inputs/BookDateInput'//'@/components/inputs/BookDateInput.vue';

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

    it('Emit input value', () => {
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

        component.find('.year').setValue(2020);
        component.find('.year').trigger('blur');
        expect(component.emitted()['update:year'][0]).deep.equal([2020]);

        component.find('.month').setValue(9);
        component.find('.month').trigger('blur');
        expect(component.emitted()['update:month'][0]).deep.equal([9]);

        component.find('.day').setValue(25);
        component.find('.day').trigger('blur');
        expect(component.emitted()['update:day'][0]).deep.equal([25]);
    });
});