import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from 'src/app/model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  API_URL: string = 'http://localhost:3000/api';
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getListAccounts(query: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/account`, {...this.httpOptions, params: query});
  }

  getAccount(accountId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/account/${accountId}`, this.httpOptions);
  }

  createAccount(account: Account): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/account`, account , this.httpOptions);
  }

  updateAccount(account: Account): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/account`, account , this.httpOptions);
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/account/${ accountId }` , this.httpOptions);
  }
}
