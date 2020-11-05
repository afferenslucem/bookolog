import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SelectableInput from '@/components/input/AutoCompletableInput.vue'

describe('SelectableInput.vue', () => {
    it('Should emit by input', async () => {
        const component = new shallowMount(SelectableInput, {
            mocks: {
                $t: () => { }
            },
            propsData: {
                name: 'test'
            },
        });

        component.find('input').setValue('qwerty');
        component.find('input').trigger('input');

        await component.vm.$nextTick()

        expect(component.vm.innerValue).equal('qwerty');

        expect(component.emitted()['update:value'][0]).deep.equal(['qwerty']);
    });

    it('Should render placeholder', async () => {
        const component = new shallowMount(SelectableInput, {
            mocks: {
                $t: () => { }
            },
            propsData: {
                name: 'test',
                placeholder: 'renderCheck',
            },
        });

        expect(component.find('input').attributes().placeholder).equal('renderCheck');
    });

    it('Should render same ids', async () => {
        const component = new shallowMount(SelectableInput, {
            mocks: {
                $t: () => { }
            },
            propsData: {
                name: 'test',
                placeholder: 'renderCheck',
                datalist: [
                    'first',
                    'second',
                    'third',
                ]
            },
        });

        await component.vm.$nextTick()

        expect(component.find('input').attributes().list).equal('test-list');
        expect(component.find('.datalist').attributes().id).equal('test-list');
        expect(component.vm.completeId).equal('test-list');
    });
});
