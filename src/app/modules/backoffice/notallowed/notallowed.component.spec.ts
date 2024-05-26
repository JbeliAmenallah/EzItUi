import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotallowedComponent } from './notallowed.component';

describe('NotallowedComponent', () => {
  let component: NotallowedComponent;
  let fixture: ComponentFixture<NotallowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotallowedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotallowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
