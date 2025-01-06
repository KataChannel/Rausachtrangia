/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CamonComponent } from './camon.component';

describe('CamonComponent', () => {
  let component: CamonComponent;
  let fixture: ComponentFixture<CamonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
