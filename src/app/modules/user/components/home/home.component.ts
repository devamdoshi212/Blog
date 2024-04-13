import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  blogs: any[] = [];
  constructor(private user: UserService) {
    this.user.getInterestedBlog().subscribe((data) => {
      if (data.success) {
        this.blogs = data.data.blogs;
      }
    });
  }
}
