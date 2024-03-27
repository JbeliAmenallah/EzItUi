import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupfunctionalityComponent } from './add-groupfunctionality.component';

describe('AddGroupfunctionalitiesComponent', () => {
  let component: AddGroupfunctionalityComponent;
  let fixture: ComponentFixture<AddGroupfunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGroupfunctionalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroupfunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
