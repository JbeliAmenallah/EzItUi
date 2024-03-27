import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupfunctionalityListComponent } from './groupfunctionality-list.component';

describe('GroupfunctionalitiesListComponent', () => {
  let component: GroupfunctionalityListComponent;
  let fixture: ComponentFixture<GroupfunctionalityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupfunctionalityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupfunctionalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
