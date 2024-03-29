import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceConfigurationListComponent } from './financeconfiguration-list.component';

describe('FinanceconfigurationListComponent', () => {
  let component: FinanceConfigurationListComponent;
  let fixture: ComponentFixture<FinanceConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceConfigurationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
