import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';
import { UserServiceService } from 'src/app/services/user.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnDestroy {
  tasks: Task[] = [];
  spinner: boolean = true;
  tsk!: Task;
  subscription?: Subscription;

  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  // yo constructor ma chai argument deko lai chai dependency injection bhanincha kina bhane this class is depended on that service.
  constructor(
    private taskService: TaskService,
    private userService: UserServiceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    this.subscription = this.taskService
      .toggleAdd()
      .subscribe((value) => this.addTask(value));
    this.taskService
      .toggleupdate()
      .subscribe((value) => this.UpdateTask(value));
    this.taskService
      .toggleDelete()
      .subscribe((value) => this.deleteTask(value));
    this.userService
      .getCurrentUser()
      .subscribe((value) => (this.currentUser = value));
  }

  // ngOnInit chai lifecycle method ho ra yo initialize huda run huncha.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.spinner = false;
      },
      error: (err: any) => {
        if (err.status === 0) {
          this.snackbar.open('server is down. Try again later.', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/']);
        }
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: (task) => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.snackbar.open('Task deleted.', 'close', { duration: 2000 });
      },
      error: (err) => {
        // console.log(err);
        this.snackbar.open('Server error', 'close');
      },
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (task: any) => {
        this.tasks.push(task);
        this.subscription?.remove;
        this.snackbar.open('Task added.', 'close', { duration: 2000 });
        this.router.navigate(['/profile']);
      },
      error: (val: any) => {
        this.snackbar.open('Server error', 'close', { duration: 2000 });
        // console.log('error in adding task', val);
      },
    });
  }

  UpdateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: (val: any) => {
        const taskToBeUpdated = this.tasks.findIndex(
          (task) => task.id === val.id
        );
        this.tasks[taskToBeUpdated] = val;
        this.snackbar.open('Task updated.', 'close', { duration: 2000 });
      },
      error: (val: any) => {
        // console.log('error in adding task', val);
        this.snackbar.open('Server error', 'close', { duration: 2000 });
      },
    });
  }

  openAddEditDialog() {
    this._dialog.open(AddTaskComponent);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
