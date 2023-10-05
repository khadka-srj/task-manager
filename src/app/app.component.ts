import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskService } from './services/task.service';
import { Task } from 'src/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = 'testapp';
  constructor(private _dialog: MatDialog, private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: console.log,
    });
  }
  openAddEditDialog() {
    this._dialog.open(AddTaskComponent);
  }
}
