import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text?: string;
  day?: string;

  onSubmit() {
    // form validation
    if (!this.text) {
      alert("You can't leave this field empty.");
      return;
    }
    if (!this.day) {
      alert("You can't leave this field empty.");
      return;
    }

    // new task
    const newTask: Task = {
      text: this.text,
      day: this.day,
    };
    // emmitting
    this.onAddTask.emit(newTask);
    // clearing the form
    this.text = '';
    this.day = '';
  }
}
