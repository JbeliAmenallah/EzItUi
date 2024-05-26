import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersessionComponent } from './usersession.component';

describe('UsersessionComponent', () => {
  let component: UsersessionComponent;
  let fixture: ComponentFixture<UsersessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
