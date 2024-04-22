import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionFormComponent } from './deduction-form.component';

describe('DeductionFormComponent', () => {
  let component: DeductionFormComponent;
  let fixture: ComponentFixture<DeductionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeductionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeductionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
