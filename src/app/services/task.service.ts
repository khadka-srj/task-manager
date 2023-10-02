import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/Task';
import { TASKS } from 'src/mock-task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  // 1st
  // yo function ko type chai Task bhane array jasto cha ra ele TASKS return garcha.
  // getTasks(): Task[] {
  //   return TASKS;
  // }
  //2nd
  // yo function ko type chai Task bhane array jasto cha ra ele TASKS return garcha aba elai observables banauna lagya.
  getTasks(): Observable<Task[]> {
    const task = of(TASKS);
    return task;
  }
}
