import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeListComponent } from './annee-list.component';

describe('AnneeListComponent', () => {
  let component: AnneeListComponent;
  let fixture: ComponentFixture<AnneeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnneeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnneeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
