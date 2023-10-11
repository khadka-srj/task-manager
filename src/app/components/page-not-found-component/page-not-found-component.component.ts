import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found-component',
  templateUrl: './page-not-found-component.component.html',
  styleUrls: ['./page-not-found-component.component.scss'],
})
export class PageNotFoundComponentComponent {
  constructor(private router: Router) {}
  redirectHome() {
    this.router.navigate(['/']);
  }
}
