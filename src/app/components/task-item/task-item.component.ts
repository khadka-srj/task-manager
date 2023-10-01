import { Component, Input } from '@angular/core';
import { Task } from 'src/Task';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  faCoffee = faCoffee;
}
