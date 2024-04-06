import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantAddComponent } from './enfant-add.component';

describe('EnfantAddComponent', () => {
  let component: EnfantAddComponent;
  let fixture: ComponentFixture<EnfantAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnfantAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnfantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
