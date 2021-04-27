import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionEditViewComponent } from './collection-edit-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { UUIDGeneratorService } from '../../../../main/services/u-u-i-d-generator.service';
import { CollectionService } from '../../services/collection.service';
import { Action } from '../../../../main/resolvers/action.resolver';

describe('CollectionEditViewComponent', () => {
  let component: CollectionEditViewComponent;
  let fixture: ComponentFixture<CollectionEditViewComponent>;
  let service: CollectionService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionEditViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: UUIDGeneratorService, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEditViewComponent);
    service = TestBed.inject(CollectionService);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('readAction', () => {
    it('read Create', () => {
      component.readAction(Action.Create);

      expect(component.action).toEqual(Action.Create);
    });

    it('read Edit', () => {
      component.readAction(Action.Edit);

      expect(component.action).toEqual(Action.Edit);
    });
  });

  describe('service trigger', () => {
    it('should trigger saveOrUpdate', async () => {
      spyOnProperty(component, 'collection', 'get').and.returnValue({});

      const spy = spyOn(component, 'saveOrUpdate');

      await component.submit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should trigger service', async () => {
      const spy = spyOn(service, 'saveOrUpdate');

      const collection = {
        modifyDate: 'md',
      } as any;

      await component.saveOrUpdate(collection);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('data flag', () => {
    it('should declare createDate', async () => {
      const collection = {} as any;

      await component.saveOrUpdate(collection);

      expect(collection.createDate).toBeTruthy(collection.createDate);
    });

    it('should change modifyDate', async () => {
      const collection = {
        modifyDate: 'md',
      } as any;

      await component.saveOrUpdate(collection);

      expect(collection.modifyDate).not.toEqual('md');
    });
  });

  describe('callback', () => {
    it('should trigger redirect', async () => {
      const saveOrUpdateSpy = spyOn(service, 'saveOrUpdate');
      const redirectSpy = spyOn(component, 'redirect');

      const collection = {
        modifyDate: 'md',
        guid: 'guid',
      } as any;

      component.action = Action.Create;

      await component.saveOrUpdate(collection);

      expect(saveOrUpdateSpy).toHaveBeenCalledWith(collection);
      expect(redirectSpy).toHaveBeenCalledWith();
      expect(redirectSpy).not.toHaveBeenCalledWith(collection.guid);
    });

    it('should trigger back', async () => {
      const saveOrUpdateSpy = spyOn(service, 'saveOrUpdate');
      const redirectSpy = spyOn(component, 'redirect');

      const collection = {
        modifyDate: 'md',
        guid: 'guid',
      } as any;

      component.action = Action.Edit;

      await component.saveOrUpdate(collection);

      expect(saveOrUpdateSpy).toHaveBeenCalledWith(collection);
      expect(redirectSpy).not.toHaveBeenCalledWith();
      expect(redirectSpy).toHaveBeenCalledWith(collection.guid);
    });
  });

  describe('should show local error', () => {
    it('required', () => {
      component.form.name = '';
      fixture.detectChanges();

      const errorText = element.querySelector('.name-field mat-error').innerHTML;

      expect(errorText).toEqual('Это обязательное поле');
    });

    it('hidden', () => {
      component.form.name = 'name';
      fixture.detectChanges();

      const errorText = element.querySelector('.name-field mat-error')?.innerHTML;

      expect(errorText).toBeFalsy();
    });
  });
});
