import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHolidayListComponent } from './holiday-list.component';

describe('HolidayListComponent', () => {
  let component: PublicHolidayListComponent;
  let fixture: ComponentFixture<PublicHolidayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHolidayListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
