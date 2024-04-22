import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeductionComponent } from './edit-deduction.component';

describe('EditDeductionComponent', () => {
  let component: EditDeductionComponent;
  let fixture: ComponentFixture<EditDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDeductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
