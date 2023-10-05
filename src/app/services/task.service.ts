import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tsk!: Task;
  private subject = new Subject<any>();
  private subjectUpdate = new Subject<any>();
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
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // subject ko code
  taskAdded(tsk: Task): void {
    this.tsk = tsk;
    this.subject.next(this.tsk);
  }
  toggleAdd(): Observable<any> {
    return this.subject.asObservable();
  }
  // updatesubject ko code
  taskUpdated(tsk: Task): void {
    this.tsk = tsk;
    this.subjectUpdate.next(this.tsk);
  }
  toggleupdate(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }
}
