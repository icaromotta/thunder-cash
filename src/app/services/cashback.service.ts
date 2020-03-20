import { CashbackInterface } from './../interfaces/cashback-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashbackService {

  private readonly API = `${environment.API}cashbacks/`;
  
  constructor(private http: HttpClient) { }

  addCashback(data: CashbackInterface) {
    return this.http.post<CashbackInterface>(`${this.API}`, data)
  }

  allCashback(userId: any) {

    console.log(`${this.API}`)

    return this.http.get<any>(`${this.API}?userId=${userId}`)
  }
}
