
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationListComponent } from './autorisation-list.component';

describe('AutorisationListComponent', () => {
  let component: AutorisationListComponent;
  let fixture: ComponentFixture<AutorisationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutorisationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutorisationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
