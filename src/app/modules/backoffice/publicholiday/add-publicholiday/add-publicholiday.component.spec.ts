import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicHolidayComponent } from './add-publicholiday.component';
describe('AddPublicholidayComponent', () => {
  let component: AddPublicHolidayComponent;
  let fixture: ComponentFixture<AddPublicHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPublicHolidayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPublicHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
