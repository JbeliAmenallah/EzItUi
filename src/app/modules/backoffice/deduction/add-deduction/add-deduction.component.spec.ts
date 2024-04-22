import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeductionComponent } from './add-deduction.component';

describe('AddDeductionComponent', () => {
  let component: AddDeductionComponent;
  let fixture: ComponentFixture<AddDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
