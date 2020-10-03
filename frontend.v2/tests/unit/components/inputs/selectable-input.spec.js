import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SelectableInput from '@/components/inputs/SelectableInput.vue'

describe('SelectableInput.vue', () => {
    it('Should emit by submit', async () => {
        const component = new shallowMount(SelectableInput, {
            mocks: {
                $t: () => {}
            }
        });

        component.find('input').setValue('qwerty');

        await component.vm.$nextTick()

        expect(component.vm.value).equal('qwerty');

        component.vm.pushBySubmit();

        expect(component.vm.value).equal('');
        expect(component.emitted()['submitted'][0]).deep.equal(['qwerty']);
    });
    it('Should emit by click', () => {
        const component = new shallowMount(SelectableInput, {
            mocks: {
                $t: () => {}
            }
        });

        component.vm.pushByValue('value');

        expect(component.vm.value).equal('');
        expect(component.emitted()['submitted'][0]).deep.equal(['value']);
    });
});