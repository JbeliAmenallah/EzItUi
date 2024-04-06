import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantListComponent } from './enfant-list.component';

describe('EnfantListComponent', () => {
  let component: EnfantListComponent;
  let fixture: ComponentFixture<EnfantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnfantListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnfantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
