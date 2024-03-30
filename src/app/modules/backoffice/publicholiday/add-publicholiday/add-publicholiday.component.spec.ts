import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicholidayComponent } from './add-publicholiday.component';

describe('AddPublicholidayComponent', () => {
  let component: AddPublicholidayComponent;
  let fixture: ComponentFixture<AddPublicholidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPublicholidayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPublicholidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
