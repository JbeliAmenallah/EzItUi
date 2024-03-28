import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutorisationComponent } from './add-autorisation.component';

describe('AddAutorisationComponent', () => {
  let component: AddAutorisationComponent;
  let fixture: ComponentFixture<AddAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAutorisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
