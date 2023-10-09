import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      text: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
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
  }
}
