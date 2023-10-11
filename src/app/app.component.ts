import { Component, OnInit } from '@angular/core';
import { Task } from 'src/Task';
import { UserServiceService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  // yo chai if yo component refresh bhayo bhane ya bata data populate huncha.
  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  title = 'testapp';
  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
