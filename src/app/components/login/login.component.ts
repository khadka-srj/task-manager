import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  spin: boolean = false;
  faSpinner = faSpinner;
  constructor(
    private router: Router,
    private logForm: FormBuilder,
    private userService: UserServiceService,
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

  onSubmit() {
    if (this.loginForm.valid) {
      this.spin = true;
      this.userService.login(this.loginForm.value).subscribe({
        next: (value) => {
          localStorage.setItem('currentUser', JSON.stringify(value));
          this.userService.setCurrentUser(value);
          this.snackbar.open('Welcome back', 'Close', { duration: 2000 });
          this.spin = false;
          this.router.navigate(['/profile']);
        },
        error: (err: any) => {
          if (err.status === 400) {
            this.spin = false;
            this.snackbar.open(
              'The username or password was incorrect',
              'Close',
              { duration: 2000 }
            );
            return;
          } else if (err.status === 0) {
            this.spin = false;
            this.snackbar.open(
              'The server is currently down. Please try again later.',
              'Close',
              { duration: 2000 }
            );
            return;
          }
        },
      });
    }
    return;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
