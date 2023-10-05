import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  tsk?: Task;
  subscription?: Subscription;
  empForm: FormGroup;
  // yo inject mat-dialog data gareko chai dailog open garda data cha bhane tyo data ma aeera bascha.
  constructor(
    private _fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.empForm = this._fb.group({
      text: '',
      day: '',
    });
    this.subscription = this.taskService
      .toggleAdd()
      .subscribe((value) => (this.tsk = value));
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.data) {
      const id = this.data.id;
      const data = { id, ...this.empForm.value };
      this.taskService.taskUpdated(data);
      this.dialogRef.close(true);
    } else {
      this.taskService.taskAdded(this.empForm.value);
      this.dialogRef.close(true);
    }
    // to emmit we do this
    // this.onAddTask.emit(this.empForm.value);
  }
}

// form validation
// if (!this.text) {
//   alert("You can't leave this field empty.");
//   return;
// }
// if (!this.day) {
//   alert("You can't leave this field empty.");
//   return;
// }
// if (!this.content) {
//   alert("You can't leave this field empty.");
//   return;
// }

// new task
// const newTask: Task = {
//   text: this.text,
//   day: this.day,
//   content: this.content,
// };

// this.router.navigate(['/']);
// clearing the form
// this.text = '';
// this.day = '';
// this.content = '';
