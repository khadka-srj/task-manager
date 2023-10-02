import { Component } from '@angular/core';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  tasks: Task[] = [];
  // yo constructor ma chai argument deko lai chai dependency injection bhanincha kina bhane this class is depended on that service.
  constructor(private taskService: TaskService) {}
  // ngOnInit chai lifecycle method ho ra ele initialize huda run huncha.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
