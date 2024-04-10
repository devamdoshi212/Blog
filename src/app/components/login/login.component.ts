import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import authGuard from '../../guards/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.getToken() && this.auth.getRole()) {
      if (this.auth.getRole() == 'USER') {
        if (authGuard(this.auth.getRole())) {
          this.router.navigate(['/user']);
        }
      }
      if (this.auth.getRole() == 'ADMIN') {
        if (authGuard(this.auth.getRole())) {
          this.router.navigate(['/admin']);
        }
      }
    } else {
      this.auth.logout();
    }
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      role: ['USER', [Validators.required]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((data) => {
        if (data.success) {
          if (this.loginForm.value.role == 'USER') {
            this.auth.setRole('USER');
            this.router.navigate(['/user']);
          } else if (this.loginForm.value.role == 'ADMIN') {
            this.auth.setRole('ADMIN');
            this.router.navigate(['/admin']);
          } else this.router.navigate(['']);
        } else {
          this.error = data.message;
        }
      });
    }
  }
}
