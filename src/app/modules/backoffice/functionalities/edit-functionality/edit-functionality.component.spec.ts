import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFunctionalityComponent } from './edit-functionality.component';

describe('EditFunctionalityComponent', () => {
  let component: EditFunctionalityComponent;
  let fixture: ComponentFixture<EditFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
