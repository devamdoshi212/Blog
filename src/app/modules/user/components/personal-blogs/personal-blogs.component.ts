import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-personal-blogs',
  templateUrl: './personal-blogs.component.html',
})
export class PersonalBlogsComponent {
  blogs: any[] = [];
  constructor(private user: UserService) {
    this.user.getPersonalBlog().subscribe((data) => {
      if (data.success) {
        this.blogs = data.data.blogs;
      }
    });
  }
}
