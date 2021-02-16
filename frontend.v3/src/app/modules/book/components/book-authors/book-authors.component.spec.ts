import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAuthorsComponent } from './book-authors.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormattingModule } from '../../../formatting/formatting.module';

describe('BookAuthorsComponent', () => {
  let component: BookAuthorsComponent;
  let fixture: ComponentFixture<BookAuthorsComponent>;
  let element: HTMLElement = null;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ BookAuthorsComponent ],
      imports: [ FormattingModule ]
    })
      .overrideComponent(BookAuthorsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAuthorsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should print one author', () => {
    component.authors = [ 'One' ];

    fixture.detectChanges();

    expect(element.innerText).toContain('One');
  });

  it('Should print many author', () => {
    component.authors = [ 'One', 'Two', 'Another Author' ];

    fixture.detectChanges();

    expect(element.innerText).toContain('One, Two, Another Author');
  });

  it('Should print no author', () => {
    component.authors = [];

    fixture.detectChanges();

    expect(element.innerText).toContain('Нет авторов');
  });

  it('Should capitalize', () => {
    component.authors = ['one', 'two'];

    fixture.detectChanges();

    expect(element.innerText).toContain('One, Two');
  });
});
