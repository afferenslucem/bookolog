import { expect } from 'chai'
import sin from 'sinon';
import { shallowMount } from '@vue/test-utils'
import PictureInput from '@/components/input/PictureInput'

describe('PictureInput.vue', () => {
    it('Should input value', () => {
        const component = new shallowMount(PictureInput, {
            mocks: {
                $t: () => {}
            }
        });

        component.vm.readFile = sin.stub();

        component.vm.onFileChange({
            target: {
                files: [
                    {
                        name: 'ololo'
                    }
                ]
            }
        })

        expect(component.vm.readFile.calledOnce).deep.equal(true);
        expect(component.emitted()['selected'].length).deep.equal(1);
    });

    it('Should show placeholder', async () => {
        const component = new shallowMount(PictureInput, {
            mocks: {
                $t: () => {}
            }
        });

        expect(component.find('.pic-input__placeholder').exists()).equal(true);
        expect(component.find('.pic-input__result').exists()).equal(false);
    });

    it('Should show result', async () => {
        const component = new shallowMount(PictureInput, {
            mocks: {
                $t: () => {}
            }
        });

        component.vm.fileUrl = 'qwerty';

        await component.vm.$nextTick()

        expect(component.find('.pic-input__placeholder').exists()).equal(false);
        expect(component.find('.pic-input__result').exists()).equal(true);
    });
});
