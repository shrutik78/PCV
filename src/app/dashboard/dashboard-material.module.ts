import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input"; 
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCheckboxModule } from "@angular/material/checkbox";
const material = [
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule
];

@NgModule({
    imports: [material],
    exports: [material]
})
export class DashboardMaterialModule {}