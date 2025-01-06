/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminXntComponent } from './admin-xnt.component';

describe('AdminXntComponent', () => {
  let component: AdminXntComponent;
  let fixture: ComponentFixture<AdminXntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminXntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminXntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
