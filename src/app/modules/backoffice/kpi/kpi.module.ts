import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KPIRoutingModule } from './kpi-routing.module';
import { KPIDashComponent } from './kpi-dash/kpi-dash.component';


@NgModule({
  declarations: [
    KPIDashComponent
  ],
  imports: [
    CommonModule,
    KPIRoutingModule
  ]
})
export class KPIModule { }
