import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeFormComponent } from './annee-form.component';

describe('AnneeFormComponent', () => {
  let component: AnneeFormComponent;
  let fixture: ComponentFixture<AnneeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnneeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnneeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
