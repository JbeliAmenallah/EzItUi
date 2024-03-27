import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFunctionalityFormComponent } from './groupfunctionality-form.component';

describe('GroupfunctionalitiesFormComponent', () => {
  let component: GroupFunctionalityFormComponent;
  let fixture: ComponentFixture<GroupFunctionalityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupFunctionalityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupFunctionalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
