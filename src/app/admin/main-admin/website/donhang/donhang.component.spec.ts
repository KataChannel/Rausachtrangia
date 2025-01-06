/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonhangComponent } from './donhang.component';

describe('DonhangComponent', () => {
  let component: DonhangComponent;
  let fixture: ComponentFixture<DonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
