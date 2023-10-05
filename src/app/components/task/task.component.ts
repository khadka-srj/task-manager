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
  tsk!: Task;
  subscription?: Subscription;
  // yo constructor ma chai argument deko lai chai dependency injection bhanincha kina bhane this class is depended on that service.
  constructor(private taskService: TaskService) {
    this.subscription = this.taskService
      .toggleAdd()
      .subscribe((value) => this.addTask(value));
  }
  // ngOnInit chai lifecycle method ho ra yo initialize huda run huncha.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
