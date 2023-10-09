import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private logForm: FormBuilder,
    private userService: UserServiceService
  ) {
    this.loginForm = this.logForm.group({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  onSubmit() {
    console.log('login details', this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe({
      next: (value) => {
        localStorage.setItem('User', JSON.stringify(value));
        this.userService.setCurrentUser(value);
      },
      error: (err: any) => console.log(err),
    });
    this.router.navigate(['/']);
  }
}
