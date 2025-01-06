/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TracuudonComponent } from './tracuudon.component';

describe('TracuudonComponent', () => {
  let component: TracuudonComponent;
  let fixture: ComponentFixture<TracuudonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracuudonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracuudonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
