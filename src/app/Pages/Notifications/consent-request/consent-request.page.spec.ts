import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentRequestPage } from './consent-request.page';

describe('ConsentRequestPage', () => {
  let component: ConsentRequestPage;
  let fixture: ComponentFixture<ConsentRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
