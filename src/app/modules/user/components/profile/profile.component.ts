import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  profile: string = '';
  fullname: string = '';
  username: string = '';
  email: string = '';
  blogCount: number = 0;
  constructor(private user: UserService) {
    this.user.getProfile().subscribe((data) => {
      this.profile = this.user.profile;
      this.fullname = this.user.fullname;
      this.username = this.user.username;
      this.email = this.user.email;
      this.blogCount = this.user.blogCount;
      console.log(this.user.profile);
      console.log(this.profile);
    });
  }
}
