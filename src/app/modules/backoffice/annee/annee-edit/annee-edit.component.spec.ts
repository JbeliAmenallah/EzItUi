import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnneeComponent } from './annee-edit.component';

describe('AnneeEditComponent', () => {
  let component: EditAnneeComponent;
  let fixture: ComponentFixture<EditAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAnneeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
