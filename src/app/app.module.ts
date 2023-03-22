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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ServiceChecklistComponent } from './components/service-checklist/service-checklist.component';
import { PartEditorComponent } from './components/part-editor/part-editor.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { PartsDashboardComponent } from './components/parts-dashboard/parts-dashboard.component';
import { MachinesComponent } from './components/machines/machines.component';


@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    PartDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SearchBarComponent,
    NavMenuComponent,
    ServiceChecklistComponent,
    PartEditorComponent,
    MachineDetailComponent,
    PartsDashboardComponent,
    MachinesComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
  
 }
