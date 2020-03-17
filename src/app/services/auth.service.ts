import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Observable } from 'rxjs'
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/shareReplay';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}users/`;
  private loggedEmitter = new EventEmitter<boolean>();
  private authenticatedUser: boolean = false

  constructor(private router: Router,
    private http: HttpClient) { }

  signup(data: any) {
    return this.http.post<UserInterface>(`${this.API}register`, data)
  }

  login(data: any) {
    return this.http.post<any>(`${this.API}login`, data)
  }

  setSession(authResult: { token: string; }) {
    localStorage.setItem('token', authResult.token);
    this.router.navigate(['/']);
    this.loggedEmitter.emit(true);
  }

  checkAuthenticatedUser() {
    if (localStorage.getItem('token')) {
      return this.authenticatedUser = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
