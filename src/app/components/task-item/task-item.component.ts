import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/Task';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

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

  // onDelete(task: Task) {
  //   this.onDeleteTask.emit(task);
  //   this._dialog.open(DeletemodalComponent);
  // }
  openDeleteDialog(data: any) {
    this._dialog.open(DeletemodalComponent, { data });
  }
  // this will open a material dialog and send data to the addtaskcomponent.
  openEditDialog(data: any) {
    this._dialog.open(AddTaskComponent, {
      data,
    });
  }
  updateTask(task: Task) {
    this.onUpdateTask.emit(task);
  }
}
