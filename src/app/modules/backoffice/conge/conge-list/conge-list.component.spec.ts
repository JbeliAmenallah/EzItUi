import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeListComponent } from './conge-list.component';

describe('CongeListComponent', () => {
  let component: CongeListComponent;
  let fixture: ComponentFixture<CongeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
