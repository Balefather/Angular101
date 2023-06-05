import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './components/parts/parts.component';
import { UsersComponent } from './components/users/users.component';
import { MachinesComponent } from './components/machines/machines.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartDetailComponent } from './components/part-detail/part-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { ServiceCreateComponent } from './components/service-create/service-create.component';
import { ServiceChecklistComponent } from './components/service-checklist/service-checklist.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes: Routes = [
  { path: 'machine-detail/:id', component: MachineDetailComponent },
  { path: 'part-detail/:id', component: PartDetailComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'service-detail/:id', component: ServiceDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'machines', component: MachinesComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'service-checklist', component: ServiceChecklistComponent},
  { path: 'service-create', component: ServiceCreateComponent},
  { path: 'settings', component: SettingsComponent },
  { path: 'reactive-form', component: ReactiveFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
