import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbsenceComponent } from './edit-absence.component';

describe('EditAbsenceComponent', () => {
  let component: EditAbsenceComponent;
  let fixture: ComponentFixture<EditAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAbsenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
