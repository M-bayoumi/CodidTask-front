import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../models/ilogin';
import { environment } from '../environments/environment';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  Login(login: ILogin) {
    return this.http.post(`${environment.Api}/ApplicationUsers/Login`, login);
  }

  Register(register: IUser) {
    return this.http.post(`${environment.Api}/ApplicationUsers/register`, register);
  }

}
