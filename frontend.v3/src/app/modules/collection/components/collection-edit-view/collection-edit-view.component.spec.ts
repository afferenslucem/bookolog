import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionEditViewComponent } from './collection-edit-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { UUIDGeneratorService } from '../../../../main/services/u-u-i-d-generator.service';
import { CollectionService } from '../../services/collection.service';
import { Action } from '../../../../main/resolvers/action.resolver';
import { Router } from '@angular/router';
import { MetrikaModule } from '../../../metrika/metrika.module';
import { MetrikaService } from '../../../metrika/services/metrika.service';

describe('CollectionEditViewComponent', () => {
  let component: CollectionEditViewComponent;
  let fixture: ComponentFixture<CollectionEditViewComponent>;
  let metrika: MetrikaService = null;
  let service: CollectionService;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionEditViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MetrikaModule],
      providers: [
        {
          provide: UUIDGeneratorService,
          useValue: {
            generate(): string {
              return null;
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEditViewComponent);
    service = TestBed.inject(CollectionService);
    router = TestBed.inject(Router);
    metrika = TestBed.inject(MetrikaService);
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

    it('should trigger saveOrUpdate', async () => {
      const spy = spyOn(service, 'saveOrUpdate').and.resolveTo();
      spyOn(router, 'navigate').and.resolveTo();
      spyOn(metrika, 'fireCollectionCreate');

      const collection = {
        modifyDate: 'md',
      } as any;

      await component.saveOrUpdate(collection);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('data flag', () => {
    it('should declare createDate', async () => {
      spyOn(metrika, 'fireCollectionCreate');
      spyOn(service, 'saveOrUpdate').and.resolveTo();
      spyOn(router, 'navigate').and.resolveTo();

      const collection = {} as any;

      await component.saveOrUpdate(collection);

      expect(collection.createDate).toBeTruthy(collection.createDate);
    });

    it('should change modifyDate', async () => {
      spyOn(metrika, 'fireCollectionCreate');
      spyOn(service, 'saveOrUpdate').and.resolveTo();
      spyOn(router, 'navigate').and.resolveTo();

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
      spyOn(metrika, 'fireCollectionCreate');

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
      spyOn(metrika, 'fireCollectionUpdate');

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

  describe('metrika', () => {
    it('should send create event', async () => {
      spyOn(service, 'saveOrUpdate');
      spyOn(router, 'navigate').and.resolveTo();
      const spy = spyOn(metrika, 'fireCollectionCreate');

      const collection = {
        modifyDate: 'md',
      } as any;

      component.action = Action.Create;

      await component.saveOrUpdate(collection);

      expect(spy).toHaveBeenCalledWith();
    });

    it('should send update event', async () => {
      spyOn(service, 'saveOrUpdate');
      spyOn(router, 'navigate').and.resolveTo();
      const spy = spyOn(metrika, 'fireCollectionUpdate');

      const collection = {
        modifyDate: 'md',
        guid: 'guid',
      } as any;

      component.action = Action.Edit;

      await component.saveOrUpdate(collection);

      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe('should show local error', () => {
    it('required', () => {
      component.form.name = '';
      fixture.detectChanges();

      const errorText = element.querySelector('.name-field ui-error').innerHTML;

      expect(errorText).toEqual('Это обязательное поле');
    });

    it('hidden', () => {
      component.form.name = 'name';
      fixture.detectChanges();

      const errorText = element.querySelector('.name-field ui-error')?.innerHTML;

      expect(errorText).toBeFalsy();
    });
  });
});
