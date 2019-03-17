import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsLayoutPage } from './tabs-layout.page';

describe('TabsPage', () => {
  let component: TabsLayoutPage;
  let fixture: ComponentFixture<TabsLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsLayoutPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
