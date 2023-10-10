import { Component, Input } from '@angular/core';
import { Task } from 'src/Task';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  constructor(private _dialog: MatDialog) {}

  // yo task chai parent component task ko html bata props ko through akko ho so input use gareko lina lai.
  @Input() task!: Task;

  faDeleteLeft = faTrash;
  faCalender = faCalendar;

  openDeleteDialog(data: any) {
    this._dialog.open(DeletemodalComponent, { data });
  }

  // this will open a material dialog and send data to the addtaskcomponent.
  openEditDialog(data: any) {
    this._dialog.open(AddTaskComponent, {
      data,
    });
  }
}
