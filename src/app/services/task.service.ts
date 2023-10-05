import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Task } from 'src/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];
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
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((tasks) => {
        this.tasks = tasks;
      })
    );
  }
  getTaskReturn() {
    return this.tasks;
  }
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
