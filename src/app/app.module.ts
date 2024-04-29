import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { CategoryListComponent } from './modules/backoffice/category/category-list/category-list.component';
import { ChartModule, ColumnSeries, Category, Tooltip } from '@syncfusion/ej2-angular-charts'; // Import Syncfusion ChartModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,


   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule ,
    ConfirmDialogModule,
    SidebarModule,
    ChartModule ,
    FontAwesomeModule // Include ChartModule in imports array

  ],
  providers: [
    provideClientHydration() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
