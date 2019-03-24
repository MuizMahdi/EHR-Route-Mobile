import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCompletionPage } from './info-completion.page';

describe('InfoCompletionPage', () => {
  let component: InfoCompletionPage;
  let fixture: ComponentFixture<InfoCompletionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCompletionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCompletionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
