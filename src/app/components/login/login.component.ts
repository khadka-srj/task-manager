import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private logForm: FormBuilder) {
    this.loginForm = this.logForm.group({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  onSubmit() {
    console.log('login details', this.loginForm.value);
    this.router.navigate(['/']);
  }
}
