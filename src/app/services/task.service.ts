import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tsk: any = null;
  private subject = new Subject<any>();
  private subjectUpdate = new Subject<any>();
  private subjectDelete = new Subject<any>();
  // private apiUrl = 'http://localhost:5000';
  private apiUrl = 'https://angular-tasker-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  addTask(task: Task): Observable<Task> {
    console.log(task, 'in add task service');
    return this.http.post<Task>(`${this.apiUrl}/new`, task);
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // subject ko code
  taskAdded(tsk: any): void {
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
  // deleteSubject ko code
  taskDeleted(tsk: Task): void {
    this.subjectDelete.next(tsk);
  }
  toggleDelete(): Observable<any> {
    return this.subjectDelete.asObservable();
  }
}
