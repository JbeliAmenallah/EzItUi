import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupeComponent } from './add-groupe.component';

describe('AddGroupeComponent', () => {
  let component: AddGroupeComponent;
  let fixture: ComponentFixture<AddGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
