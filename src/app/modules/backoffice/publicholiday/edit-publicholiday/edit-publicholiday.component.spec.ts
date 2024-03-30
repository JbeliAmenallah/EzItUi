import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicHolidayComponent } from './edit-publicholiday.component';

describe('EditPublicholidayComponent', () => {
  let component: EditPublicHolidayComponent;
  let fixture: ComponentFixture<EditPublicHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPublicHolidayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPublicHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
