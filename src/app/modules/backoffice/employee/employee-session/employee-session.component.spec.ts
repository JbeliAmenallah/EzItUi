import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSessionComponent } from './employee-session.component';

describe('EmployeeSessionComponent', () => {
  let component: EmployeeSessionComponent;
  let fixture: ComponentFixture<EmployeeSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
