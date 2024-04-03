import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrimeComponent } from './add-prime.component';

describe('AddPrimeComponent', () => {
  let component: AddPrimeComponent;
  let fixture: ComponentFixture<AddPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPrimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
