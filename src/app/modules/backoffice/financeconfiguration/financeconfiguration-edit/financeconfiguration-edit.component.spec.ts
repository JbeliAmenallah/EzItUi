import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceConfigurationEditComponent } from './financeconfiguration-edit.component';

describe('FinanceconfigurationEditComponent', () => {
  let component: FinanceConfigurationEditComponent;
  let fixture: ComponentFixture<FinanceConfigurationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceConfigurationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
