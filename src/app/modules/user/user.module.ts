import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonalBlogsComponent } from './components/personal-blogs/personal-blogs.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { AddInterestComponent } from './components/add-interest/add-interest.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
    PersonalBlogsComponent,
    BookmarkComponent,
    ProfileDetailComponent,
    AddBlogComponent,
    AddInterestComponent,
    BlogCardComponent,
  ],
  imports: [CommonModule, UserRoutingModule, MatIconModule, MatDialogModule],
})
export class UserModule {}
