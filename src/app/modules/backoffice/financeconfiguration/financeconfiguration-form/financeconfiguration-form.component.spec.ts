import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceconfigurationFormComponent } from './financeconfiguration-form.component';

describe('FinanceconfigurationFormComponent', () => {
  let component: FinanceconfigurationFormComponent;
  let fixture: ComponentFixture<FinanceconfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceconfigurationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceconfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
