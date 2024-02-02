import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NgxBarcodeScannerModule } from  '@eisberg-labs/ngx-barcode-scanner';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardAfterScanComponent } from './dashboard-after-scan/dashboard-after-scan.component';
import { DashboardMaterialModule } from './dashboard-material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DashboardComponent, DashboardAfterScanComponent,],
  imports: [
    CommonModule,NgxBarcodeScannerModule,DashboardRoutingModule,DashboardMaterialModule, ReactiveFormsModule,FormsModule
  ]
})
export class DashboardModule { }
