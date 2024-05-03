import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    RouterModule,
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
