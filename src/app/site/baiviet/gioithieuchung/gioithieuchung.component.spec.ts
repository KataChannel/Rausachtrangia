/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GioithieuchungComponent } from './gioithieuchung.component';

describe('GioithieuchungComponent', () => {
  let component: GioithieuchungComponent;
  let fixture: ComponentFixture<GioithieuchungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GioithieuchungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GioithieuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
