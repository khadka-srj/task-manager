import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  tasks: Task[] = [];
  spinner: boolean = true;
  tsk!: Task;
  subscription?: Subscription;
  updateSubscription?: Subscription;
  deleteSubscription?: Subscription;
  // yo constructor ma chai argument deko lai chai dependency injection bhanincha kina bhane this class is depended on that service.
  constructor(private taskService: TaskService) {
    this.subscription = this.taskService
      .toggleAdd()
      .subscribe((value) => this.addTask(value));
    this.updateSubscription = this.taskService
      .toggleupdate()
      .subscribe((value) => this.UpdateTask(value));
    this.deleteSubscription = this.taskService
      .toggleDelete()
      .subscribe((value) => this.deleteTask(value));
  }
  // ngOnInit chai lifecycle method ho ra yo initialize huda run huncha.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // console.log('success getting the all tasks', val);
        this.tasks = tasks;
        this.spinner = false;
      },
      error: (err: any) => {
        console.log('error getting the all tasks', err);
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
