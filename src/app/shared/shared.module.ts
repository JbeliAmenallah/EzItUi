import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'
import { MessagesModule } from 'primeng/messages'
import { DropdownModule } from 'primeng/dropdown'
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { MeterGroupModule } from 'primeng/metergroup';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TimelineModule } from 'primeng/timeline';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';

import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [],
  imports: [],
  exports: [

    FloatLabelModule,
    CheckboxModule,
    RippleModule,
    ToggleButtonModule,
    MultiSelectModule,
    PanelModule,
    MeterGroupModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    MessagesModule,
    DropdownModule,
    ToastModule,
    ConfirmPopupModule,
    DialogModule,
    CardModule,
    KeyFilterModule,
    InputNumberModule,
    RadioButtonModule,
    TreeSelectModule,
    TooltipModule,
    InputTextModule,
    TimelineModule,
    ChartModule,
    CheckboxModule,
    MultiSelectModule,
    MeterGroupModule,
    PanelModule,
    ToggleButtonModule,
    RippleModule,
    ChartModule,
    TabMenuModule,
    StepsModule,
    FloatLabelModule,
    ConfirmDialogModule,
    SpeedDialModule,
    InputTextareaModule,
    AccordionModule,
    CarouselModule,
    TagModule
  ]
})
export class SharedModule {}
