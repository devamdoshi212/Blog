import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
