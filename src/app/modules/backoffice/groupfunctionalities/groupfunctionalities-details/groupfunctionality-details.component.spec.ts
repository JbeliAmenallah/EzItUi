import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupfunctionalityDetailsComponent } from './groupfunctionality-details.component';

describe('GroupfunctionalitiesDetailsComponent', () => {
  let component: GroupfunctionalityDetailsComponent;
  let fixture: ComponentFixture<GroupfunctionalityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupfunctionalityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupfunctionalityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
