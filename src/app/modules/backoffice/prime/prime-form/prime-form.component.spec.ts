import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeFormComponent } from './prime-form.component';

describe('PrimeFormComponent', () => {
  let component: PrimeFormComponent;
  let fixture: ComponentFixture<PrimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
