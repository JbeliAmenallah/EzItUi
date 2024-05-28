import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCarouselComponent } from './users-carousel.component';

describe('UsersCarouselComponent', () => {
  let component: UsersCarouselComponent;
  let fixture: ComponentFixture<UsersCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
