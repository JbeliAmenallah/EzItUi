import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityCriterionFormComponent } from './functionality-criterion-form.component';

describe('FunctionalityCriterionFormComponent', () => {
  let component: FunctionalityCriterionFormComponent;
  let fixture: ComponentFixture<FunctionalityCriterionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionalityCriterionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionalityCriterionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
