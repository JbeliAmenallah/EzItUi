import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupfunctionalityComponent } from './edit-groupfunctionality.component';

describe('EditGroupfunctionalityComponent', () => {
  let component: EditGroupfunctionalityComponent;
  let fixture: ComponentFixture<EditGroupfunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupfunctionalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGroupfunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
