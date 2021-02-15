import { TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

export class TestCore {
  public static configureTestingModule(meta: TestModuleMetadata): TestBedStatic {
    meta.schemas.push(NO_ERRORS_SCHEMA);
    return TestBed.configureTestingModule(meta);
  }
}
