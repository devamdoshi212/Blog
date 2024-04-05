import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
