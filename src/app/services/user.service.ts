import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  // private apiUrl = 'http://localhost:5000';
  private apiUrl = 'https://angular-tasker-backend.onrender.com';
  userSubject = new Subject<any>();

  constructor(private http: HttpClient) {}
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, user);
  }

  setCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
