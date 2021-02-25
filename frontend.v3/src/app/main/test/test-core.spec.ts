import { TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

export class TestCore {
  public static configureTestingModule(meta: TestModuleMetadata): TestBedStatic {
    meta.schemas = meta.schemas || [];
    meta.schemas.push(NO_ERRORS_SCHEMA);
    meta.schemas.push(CUSTOM_ELEMENTS_SCHEMA);
    return TestBed.configureTestingModule(meta);
  }
}
