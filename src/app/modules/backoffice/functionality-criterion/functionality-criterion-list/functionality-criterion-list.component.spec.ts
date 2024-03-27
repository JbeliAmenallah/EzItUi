import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityCriterionListComponent } from './functionality-criterion-list.component';

describe('FunctionalityCriterionListComponent', () => {
  let component: FunctionalityCriterionListComponent;
  let fixture: ComponentFixture<FunctionalityCriterionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionalityCriterionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionalityCriterionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
