import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFunctionalityCriterionComponent } from './edit-functionality-criterion.component';

describe('EditFunctionalityCriterionComponent', () => {
  let component: EditFunctionalityCriterionComponent;
  let fixture: ComponentFixture<EditFunctionalityCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFunctionalityCriterionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFunctionalityCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
