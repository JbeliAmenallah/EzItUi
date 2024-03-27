import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStopwatchComponent } from './add-stopwatch.component';

describe('AddStopwatchComponent', () => {
  let component: AddStopwatchComponent;
  let fixture: ComponentFixture<AddStopwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStopwatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStopwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
