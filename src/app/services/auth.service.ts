import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Observable } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}users/`;
  loggedEmitter = new EventEmitter<boolean>();
  private authenticatedUser: boolean = false

  constructor(private router: Router,
              private http: HttpClient) { }

  signup(data: any) {
    return this.http.post<any>(`${this.API}register`, data)
    .pipe(
      tap((response) => {
      this.setSession(response);
    }))
  }

  login(data: any) {
    return this.http.post<any>(`${this.API}login`, data)
      .pipe(
        tap((response) => {
        this.setSession(response);
      }))
  }

  setSession(authResult: { token: string; userId: string }) {
    
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('userId', authResult.userId);
    this.router.navigateByUrl('/');
    this.loggedEmitter.emit(true);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      this.loggedEmitter.emit(true);
      return true;
    } else {
      this.loggedEmitter.emit(false);
      return false;
    }
  }

  checkAuthenticatedUser() {
    if (localStorage.getItem('token')) {
      return this.authenticatedUser = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
