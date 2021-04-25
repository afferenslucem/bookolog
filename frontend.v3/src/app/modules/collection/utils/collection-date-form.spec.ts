import { CollectionDataForm } from './collection-data-form';
import { ProgressAlgorithmType } from '../../book/models/progress-algorithm-type';
import { CollectionData } from '../models/collection-data';
import { Collection } from '../models/collection';

describe('CollectionDataForm', () => {
  let form: CollectionDataForm = null;

  beforeEach(() => {
    form = new CollectionDataForm();
  })

  it('should create an instance', () => {
    expect(new CollectionDataForm()).toBeTruthy();
  });

  describe('Accessors', () => {
    beforeEach(() => {
      form.build();
    })

    describe('Getters', () => {
      it('name', () => {
        form.nativeForm.get('name').setValue('name');

        expect(form.name).toEqual('name');
      });

      it('description', () => {
        form.nativeForm.get('description').setValue('description');

        expect(form.description).toEqual('description');
      });
    });

    describe('Setters', () => {
      it('name', () => {
        form.name = 'name';

        expect(form.nativeForm.get('name').value).toEqual('name');
      });

      it('description', () => {
        form.description = 'description';

        expect(form.nativeForm.get('description').value).toEqual('description');
      });
    });
  })

  describe('Validation', () => {
    beforeEach(() => {
      form.build();
    })

    describe('name', () => {
      it('should show required error', () => {
        form.name = '';

        expect(form.nameInvalid).toBeTrue();
        expect(form.nameErrorMessage).toEqual('Это обязательное поле');
      });

      it('should hide required error', () => {
        form.name = 'name';

        expect(form.nameInvalid).toBeFalse();
        expect(form.nameErrorMessage).toEqual(null);
      });
    })

    describe('description', () => {
      it('should hide required error for empty', () => {
        form.description = '';

        expect(form.descriptionInvalid).toBeFalse();
        expect(form.descriptionErrorMessage).toEqual(null);
      });

      it('should hide required error for filled', () => {
        form.description = 'description';

        expect(form.descriptionInvalid).toBeFalse();
        expect(form.descriptionErrorMessage).toEqual(null);
      });
    })
  });



  describe('build', () => {
    it('should init', () => {
      const initDate: Collection = {
        name: 'name',
        description: 'description',
        createDate: new Date(),
        modifyDate: new Date(),
        guid: 'guid'
      };

      form = new CollectionDataForm(initDate);
      form.build();

      expect(form.name).toEqual(initDate.name);
      expect(form.description).toEqual(initDate.description);

      expect(form.value.name).toEqual(initDate.name);
      expect(form.value.description).toEqual(initDate.description);
    });

    it('should init for empty default', () => {
      form = new CollectionDataForm();
      form.build();

      expect(form.name).toEqual('');
      expect(form.description).toEqual('');

      expect(form.value).toEqual({
        name: '',
        description: '',
      } as any);
    });
  })
});
