import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcongeComponent } from './addconge.component';

describe('AddcongeComponent', () => {
  let component: AddcongeComponent;
  let fixture: ComponentFixture<AddcongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcongeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
