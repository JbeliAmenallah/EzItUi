import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHolidayCalendarComponent } from './public-holiday-calendar.component';

describe('PublicHolidayCalendarComponent', () => {
  let component: PublicHolidayCalendarComponent;
  let fixture: ComponentFixture<PublicHolidayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHolidayCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicHolidayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
