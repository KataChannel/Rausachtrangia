/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageadminComponent } from './pageadmin.component';

describe('PageadminComponent', () => {
  let component: PageadminComponent;
  let fixture: ComponentFixture<PageadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
