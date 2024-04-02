import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesListComponent } from './entreprise-list.component';
describe('EntrepriseListComponent', () => {
  let component: EntreprisesListComponent;
  let fixture: ComponentFixture<EntreprisesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntreprisesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntreprisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
