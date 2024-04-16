import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAutorisationComponent } from './demande-autorisation.component';

describe('DemandeAutorisationComponent', () => {
  let component: DemandeAutorisationComponent;
  let fixture: ComponentFixture<DemandeAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeAutorisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
