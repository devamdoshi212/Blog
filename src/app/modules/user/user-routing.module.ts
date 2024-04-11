import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalBlogsComponent } from './components/personal-blogs/personal-blogs.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'blogs',
        component: PersonalBlogsComponent,
      },
      {
        path: 'bookmark',
        component: BookmarkComponent,
      },
      {
        path: 'profile',
        component: ProfileDetailComponent,
      },
      {
        path: '',
        redirectTo: '/user/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
