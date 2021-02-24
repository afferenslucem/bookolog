import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CollectionEditViewComponent} from './collection-edit-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestCore} from '../../../../main/test/test-core.spec';
import {RouterTestingModule} from '@angular/router/testing';
import {UUIDGeneratorService} from '../../../../main/services/u-u-i-d-generator.service';
import {CollectionService} from '../../services/collection.service';
import {Action} from '../../../../main/resolvers/action.resolver';
import {Location} from '@angular/common';
import {TitleService} from '../../../ui/service/title.service';

describe('CollectionEditViewComponent', () => {
  let component: CollectionEditViewComponent;
  let fixture: ComponentFixture<CollectionEditViewComponent>;
  let service: CollectionService;
  let titleService: TitleService;
  let location: Location;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionEditViewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: UUIDGeneratorService, useValue: {}},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEditViewComponent);
    service = TestBed.inject(CollectionService);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    titleService = TestBed.inject(TitleService);
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('readAction', () => {
    it('read Create', async () => {
      component.readAction(Action.Create);

      expect(component.action).toEqual(Action.Create);
    });

    it('read Edit', async () => {
      component.readAction(Action.Edit);

      expect(component.action).toEqual(Action.Edit);
    });
  });

  describe('setTitle', () => {
    it('set Create', async () => {
      const spy = spyOn(titleService, 'setCollectionCreate');

      component.readAction(Action.Create);

      expect(spy).toHaveBeenCalled();
    });

    it('set Edit', async () => {
      const spy = spyOn(titleService, 'setCollectionEdit');

      component.readAction(Action.Edit);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('service trigger', () => {
    it('should trigger saveOrUpdate', async () => {
      component.collection = {} as any;

      const spy = spyOn(component, 'saveOrUpdate');

      await component.submit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should trigger service', async () => {
      const spy = spyOn(service, 'saveOrUpdate');

      const collection = {
        modifyDate: 'md'
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
        modifyDate: 'md'
      } as any;

      await component.saveOrUpdate(collection);

      expect(collection.modifyDate).not.toEqual('md');
    });
  });

  describe('callback', () => {
    it('should trigger redirect', async () => {
      const saveOrUpdateSpy = spyOn(service, 'saveOrUpdate');
      const redirectSpy = spyOn(component, 'redirect');
      const backSpy = spyOn(location, 'back');

      const collection = {
        modifyDate: 'md'
      } as any;

      component.action = Action.Create;

      await component.saveOrUpdate(collection);

      expect(saveOrUpdateSpy).toHaveBeenCalled();
      expect(redirectSpy).toHaveBeenCalled();
      expect(backSpy).not.toHaveBeenCalled();
    });

    it('should trigger back', async () => {
      const saveOrUpdateSpy = spyOn(service, 'saveOrUpdate');
      const redirectSpy = spyOn(component, 'redirect');
      const backSpy = spyOn(location, 'back');

      const collection = {
        modifyDate: 'md'
      } as any;

      component.action = Action.Edit;

      await component.saveOrUpdate(collection);

      expect(saveOrUpdateSpy).toHaveBeenCalled();
      expect(redirectSpy).not.toHaveBeenCalled();
      expect(backSpy).toHaveBeenCalled();
    });
  });
});
