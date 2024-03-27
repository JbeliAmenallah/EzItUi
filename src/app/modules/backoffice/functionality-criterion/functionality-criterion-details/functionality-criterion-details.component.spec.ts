import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityCriterionDetailsComponent } from './functionality-criterion-details.component';

describe('FunctionalityCriterionDetailsComponent', () => {
  let component: FunctionalityCriterionDetailsComponent;
  let fixture: ComponentFixture<FunctionalityCriterionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionalityCriterionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionalityCriterionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
