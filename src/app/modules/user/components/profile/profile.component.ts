import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile: string = '';
  fullname: string = '';
  username: string = '';
  email: string = '';
  blogCount: number = 0;
  constructor(private user: UserService) {
    this.user.getProfile().subscribe((data) => {});
  }
  ngOnInit(): void {
    this.user.profileChange.subscribe((data: string) => {
      this.profile = data;
    });
    this.user.fullnameChange.subscribe(
      (data: string) => (this.fullname = data)
    );
    this.user.usernameChange.subscribe(
      (data: string) => (this.username = data)
    );
    this.user.emailChange.subscribe((data: string) => (this.email = data));
    this.user.blogCountChange.subscribe(
      (data: number) => (this.blogCount = data)
    );
  }
}
