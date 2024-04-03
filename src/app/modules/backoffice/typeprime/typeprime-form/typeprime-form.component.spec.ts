import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeprimeFormComponent } from './typeprime-form.component';

describe('TypeprimeFormComponent', () => {
  let component: TypeprimeFormComponent;
  let fixture: ComponentFixture<TypeprimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeprimeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeprimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
