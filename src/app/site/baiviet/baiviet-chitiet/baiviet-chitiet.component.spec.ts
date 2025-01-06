/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaivietChitietComponent } from './baiviet-chitiet.component';

describe('BaivietChitietComponent', () => {
  let component: BaivietChitietComponent;
  let fixture: ComponentFixture<BaivietChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaivietChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaivietChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
