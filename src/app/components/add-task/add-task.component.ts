import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  tsk?: Task;
  subscription?: Subscription;
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private dialogRef: DialogRef<AddTaskComponent>
  ) {
    this.empForm = this._fb.group({
      text: '',
      day: '',
    });
    this.subscription = this.taskService
      .toggleAdd()
      .subscribe((value) => (this.tsk = value));
  }

  onSubmit() {
    // to emmit we do this
    // this.onAddTask.emit(this.empForm.value);
    this.taskService.taskAdded(this.empForm.value);
    this.dialogRef.close();
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
