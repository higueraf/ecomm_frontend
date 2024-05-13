import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin.component';
import { LogInAdminComponent } from './pages/log-in-admin/log-in-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [AdminComponent, LogInAdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatNavList,
    MatList,
    MatListItem,
    MatMenuModule,
    MatCardModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
