import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumber2Component } from './page-number2.component';

describe('PageNumber2Component', () => {
  let component: PageNumber2Component;
  let fixture: ComponentFixture<PageNumber2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNumber2Component]
    });
    fixture = TestBed.createComponent(PageNumber2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
