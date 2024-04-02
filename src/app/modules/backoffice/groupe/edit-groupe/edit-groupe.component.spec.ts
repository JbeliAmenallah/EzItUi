import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupeComponent } from './edit-groupe.component';

describe('EditGroupeComponent', () => {
  let component: EditGroupeComponent;
  let fixture: ComponentFixture<EditGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
