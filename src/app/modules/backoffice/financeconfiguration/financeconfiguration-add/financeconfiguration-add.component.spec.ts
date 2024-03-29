import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceconfigurationAddComponent } from './financeconfiguration-add.component';

describe('FinanceconfigurationAddComponent', () => {
  let component: FinanceconfigurationAddComponent;
  let fixture: ComponentFixture<FinanceconfigurationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceconfigurationAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceconfigurationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
