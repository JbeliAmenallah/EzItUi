import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeListComponent } from './prime-list.component';

describe('PrimeListComponent', () => {
  let component: PrimeListComponent;
  let fixture: ComponentFixture<PrimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
