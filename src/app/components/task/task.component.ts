import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  user: any = null;
  tasks: Task[] = [];
  spinner: boolean = true;
  tsk!: Task;

  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  // yo constructor ma chai argument deko lai chai dependency injection bhanincha kina bhane this class is depended on that service.
  constructor(
    private taskService: TaskService,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.taskService.toggleAdd().subscribe((value) => this.addTask(value));
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
        console.log('error getting the all tasks', err.status);
        if (err.status === 0) {
          alert('server is down.');
          this.router.navigate(['/']);
        }
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (task: any) => {
        this.tasks.push(task);
      },
      error: (val: any) => {
        console.log('error in adding task', val);
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
      },
      error: (val: any) => {
        console.log('error in adding task', val);
      },
    });
  }
}
