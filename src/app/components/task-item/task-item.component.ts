import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/Task';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  // yo task chai parent component task ko html bata props ko through akko ho so input use gareko lina lai.
  @Input() task!: Task;
  // you emit gareko event chai aba hamro yo component ko tag ma access garna milxa.
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  faCoffee = faCoffee;

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
}
