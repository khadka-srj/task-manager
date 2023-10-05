import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { Task } from 'src/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = 'testapp';
  constructor(private _dialog: MatDialog) {}
  ngOnInit(): void {}
  openAddEditDialog() {
    this._dialog.open(AddTaskComponent);
  }
}
