import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AudioBookUnitsInput from '@/components/inputs/AudioBookUnitsInput.vue';

describe('AudioBookUnitsInput.vue', () => {
    it('Renders empty props for nulls', () => {
        const component = new shallowMount(AudioBookUnitsInput, {
            propsData: {
                units: null
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.hours').element.value).equal('');
        expect(component.find('.minutes').element.value).equal('');
    });

    it('Renders only hours value for 60 units', () => {
        const component = new shallowMount(AudioBookUnitsInput, {
            propsData: {
                units: 60
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.hours').element.value).equal('1');
        expect(component.find('.minutes').element.value).equal('');
    });

    it('Renders only minutes value for 16 units', () => {
        const component = new shallowMount(AudioBookUnitsInput, {
            propsData: {
                units: 16
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.hours').element.value).equal('');
        expect(component.find('.minutes').element.value).equal('16');
    });

    it('Renders both values for 146 units', () => {
        const component = new shallowMount(AudioBookUnitsInput, {
            propsData: {
                units: 146
            },
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.hours').element.value).equal('2');
        expect(component.find('.minutes').element.value).equal('26');
    });

    it('Should trigger sync', () => {
        const component = new shallowMount(AudioBookUnitsInput, {
            propsData: {
                units: null
            },
            mocks: {
                $t: () => {}
            }
        });

        component.find('.hours').setValue(2);
        component.find('.hours').trigger('blur');

        component.find('.minutes').setValue(12);
        component.find('.minutes').trigger('blur');
        
        component.find('form').trigger('blur');

        expect(component.emitted()['update:units'][0]).deep.equal([132]);
    });
});