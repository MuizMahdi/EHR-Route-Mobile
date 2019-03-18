import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordPage } from './health-record.page';

describe('HealthRecordPage', () => {
  let component: HealthRecordPage;
  let fixture: ComponentFixture<HealthRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
