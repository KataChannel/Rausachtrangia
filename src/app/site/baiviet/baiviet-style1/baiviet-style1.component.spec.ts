/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaivietStyle1Component } from './baiviet-style1.component';

describe('BaivietStyle1Component', () => {
  let component: BaivietStyle1Component;
  let fixture: ComponentFixture<BaivietStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaivietStyle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaivietStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
