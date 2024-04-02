import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseFormComponent } from './entreprise-form.component';

describe('EntrepriseFormComponent', () => {
  let component: EntrepriseFormComponent;
  let fixture: ComponentFixture<EntrepriseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrepriseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrepriseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
