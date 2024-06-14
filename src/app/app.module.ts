import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { CategoryListComponent } from './modules/backoffice/category/category-list/category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'primeng/chart';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NotallowedComponent } from './modules/backoffice/notallowed/notallowed.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { MessageComponent } from './modules/backoffice/message/message.component';
import { SharedModule } from './shared/shared.module';
import { ImageModule } from 'primeng/image';
import { PublicHolidayCalendarComponent } from './modules/backoffice/public-holiday-calendar/public-holiday-calendar.component';
import { TimeAgoPipe } from './modules/pipes/time-ago.pipe';


import { PredictionComponent } from './modules/backoffice/prediction/prediction.component';
import { ReactiveFormsModule } from '@angular/forms';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8810',
        realm: 'Rh-Application',
        clientId: 'Rh'
      },
      initOptions: {
        onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NotallowedComponent,
    MessageComponent,
    PublicHolidayCalendarComponent,
    TimeAgoPipe,

    NotallowedComponent,
    PredictionComponent
  ],
  imports: [
 
    ImageModule,
    SharedModule,
    BadgeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule ,
    ConfirmDialogModule,
    SidebarModule,
    ChartModule ,
    KeycloakAngularModule,
    FullCalendarModule,MessageModule,
    FontAwesomeModule,
    ReactiveFormsModule, 
    SharedModule,

  ],
  providers: [
    provideClientHydration() ,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
  },MessageService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
