import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityFormComponent } from './functionality-form.component';

describe('FunctionalityFormComponent', () => {
  let component: FunctionalityFormComponent;
  let fixture: ComponentFixture<FunctionalityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
