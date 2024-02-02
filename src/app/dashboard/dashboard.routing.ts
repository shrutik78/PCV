import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardAfterScanComponent } from './dashboard-after-scan/dashboard-after-scan.component';

const routes: Routes = [

  {
    path: '',
    component:DashboardComponent
  },
  {
    path:'dashboard/:vinNumber',
    component:DashboardAfterScanComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
