import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeprimeComponent } from './edit-typeprime.component';

describe('EditTypeprimeComponent', () => {
  let component: EditTypeprimeComponent;
  let fixture: ComponentFixture<EditTypeprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTypeprimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTypeprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
