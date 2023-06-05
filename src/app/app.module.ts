import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PartsComponent } from './components/parts/parts.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';
import { PartDetailComponent } from './components/part-detail/part-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // <-- NgModel lives here
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

/* import { InMemoryDataService } from './services/in-memory-data.service'; */
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ServiceChecklistComponent } from './components/service-checklist/service-checklist.component';
import { ServiceEditorComponent } from './components/service-editor/service-editor.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { PartsDashboardComponent } from './components/parts-dashboard/parts-dashboard.component';
import { MachinesComponent } from './components/machines/machines.component';
import { JwtInterceptor } from './services/jwt-interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ServiceCreateComponent } from './components/service-create/service-create.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    UsersComponent,
    UserDetailComponent,
    PartDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SearchBarComponent,
    NavMenuComponent,
    ServiceChecklistComponent,
    ServiceEditorComponent,
    MachineDetailComponent,
    PartsDashboardComponent,
    MachinesComponent,
    UserProfileComponent,
    SettingsComponent,
    ServiceCreateComponent,
    ServicesComponent,
    ServiceDetailComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  
 }
