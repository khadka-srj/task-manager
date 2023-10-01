import { Component } from '@angular/core';
import { Task } from 'src/Task';
import { TASKS } from 'src/mock-task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  tasks: Task[] = TASKS;
}
