/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaivietComponent } from './baiviet.component';

describe('BaivietComponent', () => {
  let component: BaivietComponent;
  let fixture: ComponentFixture<BaivietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaivietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaivietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
