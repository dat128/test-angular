import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:3000/api';
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    })
  };
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router) {}

  login(user: User): Observable<any> {
      return this.httpClient.post<any>(`${this.API_URL}/user/login`, user, this.httpOptions);
  }

  logout() {
    if (localStorage.removeItem('accessToken') === null) {
      this.router.navigate(['/login']);
    }
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('accessToken');
    return authToken !== null ? true : false;
  }
}
