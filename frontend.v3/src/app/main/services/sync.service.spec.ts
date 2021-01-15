// import { TestBed } from '@angular/core/testing';
// import { UserService } from '../../modules/user/services/user.services';
// import { SyncService } from './sync.services';
//
// describe('SyncService', () => {
//   let services: SyncService;
//   let userService: UserService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         UserService
//       ]
//     });
//     services = TestBed.inject(SyncService);
//     userService = TestBed.inject(UserService);
//   });
//
//   it('should be created', () => {
//     expect(services).toBeTruthy();
//   });
//
//   // it('nowUTC', () => {
//   //   const now = new Date('2020-11-18 09:33:00');
//   //   const spyNow = spyOnProperty(services, 'now', 'get').and.returnValue(now);
//   //
//   //   const utcNow = services.nowUTC;
//   //
//   //   expect(utcNow).toEqual(new Date('2020-11-18 04:33:00'));
//   //   expect(spyNow).toHaveBeenCalledTimes(1);
//   // });
//
//   describe('getData', () => {
//     it('should return fresh', async () => {
//       const spyShouldSync = spyOnProperty(services, 'shouldRestore', 'get').and.returnValue(true);
//
//       const spyLocal = jasmine.createSpy();
//
//       const value = 'books';
//       const spyRemote = jasmine.createSpy().and.resolveTo(value);
//
//       const spyUpdate = jasmine.createSpy();
//
//       await services.getData(spyLocal, spyRemote, spyUpdate);
//
//       expect(spyLocal).toHaveBeenCalledTimes(1);
//       expect(spyRemote).toHaveBeenCalledTimes(1);
//       expect(spyUpdate).toHaveBeenCalledTimes(1);
//       expect(spyUpdate).toHaveBeenCalledWith(value);
//       expect(spyShouldSync).toHaveBeenCalledTimes(1);
//     });
//
//     it('should return local', async () => {
//       const spyShouldSync = spyOnProperty(services, 'shouldRestore', 'get').and.returnValue(false);
//
//       const spyLocal = jasmine.createSpy();
//       const spyRemote = jasmine.createSpy();
//       const spyUpdate = jasmine.createSpy();
//
//       await services.getData(spyLocal, spyRemote, spyUpdate);
//
//       expect(spyLocal).toHaveBeenCalledTimes(1);
//       expect(spyRemote).toHaveBeenCalledTimes(0);
//       expect(spyUpdate).toHaveBeenCalledTimes(0);
//       expect(spyShouldSync).toHaveBeenCalledTimes(1);
//     });
//   });
//
//   describe('shouldSync',  () => {
//     it('should return true', () => {
//       const utcNow = new Date('2020-11-18 04:33:00');
//       const lastDate = new Date('2020-11-17 22:32:00');
//
//       const spyNow = spyOnProperty(services, 'nowUTC', 'get').and.returnValue(utcNow);
//       const spyLastDate = spyOnProperty(userService, 'lastSyncDate', 'get').and.returnValue(lastDate);
//
//       const result = services.shouldRestore;
//
//       expect(result).toBeTrue();
//
//       expect(spyNow).toHaveBeenCalledTimes(1);
//       expect(spyLastDate).toHaveBeenCalledTimes(1);
//     });
//
//     it('should return false', () => {
//       const utcNow = new Date('2020-11-18 04:33:00');
//       const lastDate = new Date('2020-11-18 08:33:00');
//
//       const spyNow = spyOnProperty(services, 'nowUTC', 'get').and.returnValue(utcNow);
//       const spyLastDate = spyOnProperty(userService, 'lastSyncDate', 'get').and.returnValue(lastDate);
//
//       const result = services.shouldRestore;
//
//       expect(result).toBeFalse();
//
//       expect(spyNow).toHaveBeenCalledTimes(1);
//       expect(spyLastDate).toHaveBeenCalledTimes(1);
//     });
//   });
// });
