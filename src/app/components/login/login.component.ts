import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private logForm: FormBuilder,
    private userService: UserServiceService,
    private meta: Meta
  ) {
    this.loginForm = this.logForm.group({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }
  ngOnInit(): void {
    this.meta.addTag({
      name: 'Login page',
      content: 'This is a page to Login to the tasker app.',
    });
  }
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (value) => {
        localStorage.setItem('currentUser', JSON.stringify(value));
        this.userService.setCurrentUser(value);
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        if (err.status === 400) {
          return alert('the username or password was incorrect');
        } else if (err.status === 0) {
          return alert('The server is currently down.Please try again later.');
        }
      },
    });
  }
}
