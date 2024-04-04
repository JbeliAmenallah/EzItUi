import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnfantComponent } from './enfant-edit.component';

describe('EnfantEditComponent', () => {
  let component: EditEnfantComponent;
  let fixture: ComponentFixture<EditEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEnfantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
