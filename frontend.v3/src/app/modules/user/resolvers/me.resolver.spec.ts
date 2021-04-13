import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MeResolver } from './me.resolver';
import { UserService } from '../services/user.service';

describe('MeResolver', () => {
  let resolver: MeResolver;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(MeResolver);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(origin).toBeTruthy();
  });

  it('should return new obj', async () => {
    const spy = spyOn(service, 'loadMe').and.resolveTo({
      login: 'new',
    } as any);

    const result = await resolver.resolve();

    expect(result).toEqual({
      login: 'new',
    } as any);

    expect(spy).toHaveBeenCalledOnceWith();
  });

  it('should return cached obj', async () => {
    const spy = spyOn(service, 'loadMe').and.rejectWith();

    service.user = {
      login: 'old',
    } as any;

    const result = await resolver.resolve();

    expect(result).toEqual({
      login: 'old',
    } as any);

    expect(spy).toHaveBeenCalledOnceWith();
  });
});
