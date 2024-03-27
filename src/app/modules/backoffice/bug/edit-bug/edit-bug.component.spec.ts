import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBugComponent } from './edit-bug.component';

describe('EditBugComponent', () => {
  let component: EditBugComponent;
  let fixture: ComponentFixture<EditBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
