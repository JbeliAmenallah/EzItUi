import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePrimeListComponent } from './typeprime-list.component';

describe('TypeprimeListComponent', () => {
  let component: TypePrimeListComponent;
  let fixture: ComponentFixture<TypePrimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypePrimeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypePrimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
