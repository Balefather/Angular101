import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PartsComponent } from './components/parts/parts.component';
import { FormsModule } from '@angular/forms';
import { PartDetailComponent } from './components/part-detail/part-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // <-- NgModel lives here
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

/* import { InMemoryDataService } from './services/in-memory-data.service'; */
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ServiceChecklistComponent } from './components/service-checklist/service-checklist.component';


@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    PartDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    NavMenuComponent,
    ServiceChecklistComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
  
 }
