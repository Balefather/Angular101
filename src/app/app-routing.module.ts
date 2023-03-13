import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './components/parts/parts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartDetailComponent } from './components/part-detail/part-detail.component';
import { ServiceChecklistComponent } from './components/service-checklist/service-checklist.component';

const routes: Routes = [
  { path: 'detail/:id', component: PartDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'service-checklist', component: ServiceChecklistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
