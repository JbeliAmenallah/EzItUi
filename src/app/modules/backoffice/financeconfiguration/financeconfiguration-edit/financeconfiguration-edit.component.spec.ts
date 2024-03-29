import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceconfigurationEditComponent } from './financeconfiguration-edit.component';

describe('FinanceconfigurationEditComponent', () => {
  let component: FinanceconfigurationEditComponent;
  let fixture: ComponentFixture<FinanceconfigurationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceconfigurationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceconfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
