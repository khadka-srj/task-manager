import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/Task';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  constructor(private _dialog: MatDialog, private taskService: TaskService) {}
  // yo task chai parent component task ko html bata props ko through akko ho so input use gareko lina lai.
  @Input() task!: Task;
  // you emit gareko event chai aba hamro yo component ko tag ma access garna milxa.
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  faDeleteLeft = faTrash;
  faCalender = faCalendar;

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.taskService.getTasks().subscribe();
        }
      },
    });
  }
  updateTask(task: Task) {
    this.onUpdateTask.emit(task);
  }
}
