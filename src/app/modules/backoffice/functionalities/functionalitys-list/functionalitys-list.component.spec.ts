import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitysListComponent } from './functionalitys-list.component';

describe('FunctionalitysListComponent', () => {
  let component: FunctionalitysListComponent;
  let fixture: ComponentFixture<FunctionalitysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalitysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalitysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
