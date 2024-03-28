import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutorisationComponent } from './edit-autorisation.component';

describe('EditAutorisationComponent', () => {
  let component: EditAutorisationComponent;
  let fixture: ComponentFixture<EditAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAutorisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
