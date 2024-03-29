import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceFormComponent } from './absence-form.component';

describe('AbsenceFormComponent', () => {
  let component: AbsenceFormComponent;
  let fixture: ComponentFixture<AbsenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbsenceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
