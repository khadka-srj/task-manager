import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  showAddNote?: boolean;
  subscription?: Subscription;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddNote = value));
  }

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text?: string;
  day?: string;
  content?: string;

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
    if (!this.content) {
      alert("You can't leave this field empty.");
      return;
    }

    // new task
    const newTask: Task = {
      text: this.text,
      day: this.day,
      content: this.content,
    };
    // to emmit we do this
    // this.onAddTask.emit(newTask);

    this.taskService.addTask(newTask).subscribe();
    this.router.navigate(['/']);
    // clearing the form
    this.text = '';
    this.day = '';
    this.content = '';
  }
}
