import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss'],
})
export class DeletemodalComponent {
  constructor(
    private dialog: MatDialogRef<DeletemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {}
  closeDialog() {
    this.dialog.close();
  }
  onDelete() {
    this.taskService.taskDeleted(this.data);
    this.dialog.close();
    // aba yo data lai delete garna paro.
  }
}
