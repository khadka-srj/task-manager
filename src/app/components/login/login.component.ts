import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user.service';
import { Meta } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  constructor(
    private router: Router,
    private logForm: FormBuilder,
    private userService: UserServiceService,
    private meta: Meta,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = this.logForm.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
      ]),
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
          this.snackbar.open('The username or password was incorrect', 'Close');
          return;
        } else if (err.status === 0) {
          this.snackbar.open(
            'The server is currently down. Please try again later.',
            'Close'
          );
          return;
        }
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
