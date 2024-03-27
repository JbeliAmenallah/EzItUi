import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityDetailsComponent } from './functionality-details.component';

describe('FunctionalityDetailsComponent', () => {
  let component: FunctionalityDetailsComponent;
  let fixture: ComponentFixture<FunctionalityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionalityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionalityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
