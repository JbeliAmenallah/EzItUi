import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopwatchRoutingModule } from './stopwatch-routing.module';
import { AddStopwatchComponent } from './add-stopwatch/add-stopwatch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
   
    AddStopwatchComponent,
   
  ],
  imports: [
    CommonModule,
    StopwatchRoutingModule ,
    ReactiveFormsModule ,
    FormsModule,
    SharedModule
  ]
})
export class StopwatchModule { }
