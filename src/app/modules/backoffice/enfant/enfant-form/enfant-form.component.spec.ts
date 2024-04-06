import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantFormComponent } from './enfant-form.component';

describe('EnfantFormComponent', () => {
  let component: EnfantFormComponent;
  let fixture: ComponentFixture<EnfantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnfantFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnfantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
