import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KPIDashComponent } from './kpi-dash.component';

describe('KPIDashComponent', () => {
  let component: KPIDashComponent;
  let fixture: ComponentFixture<KPIDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KPIDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KPIDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
