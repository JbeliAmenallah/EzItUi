import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeEditComponent } from './annee-edit.component';

describe('AnneeEditComponent', () => {
  let component: AnneeEditComponent;
  let fixture: ComponentFixture<AnneeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnneeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnneeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
