import { Injectable } from '@angular/core';
import { UserService } from '../../modules/user/services/user.service';
import { UUIDGenerator } from 'essents';

@Injectable({
  providedIn: 'root',
})
export class UUIDGeneratorService {
  private generator: UUIDGenerator;

  constructor(userService: UserService) {
    this.generator = new UUIDGenerator(userService.user.login);
  }

  public generate(): string {
    return this.generator.generate();
  }
}
