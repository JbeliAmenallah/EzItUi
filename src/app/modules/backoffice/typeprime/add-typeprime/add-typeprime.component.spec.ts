import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeprimeComponent } from './add-typeprime.component';

describe('AddTypeprimeComponent', () => {
  let component: AddTypeprimeComponent;
  let fixture: ComponentFixture<AddTypeprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTypeprimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTypeprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
