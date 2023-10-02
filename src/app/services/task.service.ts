import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/Task';
import { TASKS } from 'src/mock-task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  // adding httpclient as an argument as a DA.
  constructor(private http: HttpClient) {}
  // 1st
  // yo function ko type chai Task bhane array jasto cha ra ele TASKS return garcha.
  // getTasks(): Task[] {
  //   return TASKS;
  // }
  //2nd
  // yo function ko type chai Task bhane array jasto cha ra ele TASKS return garcha aba elai observables banauna lagya.
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
}
