import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { Task } from 'src/Task';
import { UserServiceService } from './services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  currentUser: any = localStorage.getItem('User');
  userSubscription?: Subscription;
  title = 'testapp';
  constructor(
    private _dialog: MatDialog,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.userSubscription = this.userService
      .getCurrentUser()
      .subscribe((value) => (this.currentUser = value));
  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('User');
  }
  openAddEditDialog() {
    this._dialog.open(AddTaskComponent);
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
