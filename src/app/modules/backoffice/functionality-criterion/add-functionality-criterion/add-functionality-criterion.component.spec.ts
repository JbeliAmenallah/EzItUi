import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFunctionalityCriterionComponent } from './add-functionality-criterion.component';

describe('AddFunctionalityCriterionComponent', () => {
  let component: AddFunctionalityCriterionComponent;
  let fixture: ComponentFixture<AddFunctionalityCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFunctionalityCriterionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFunctionalityCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
