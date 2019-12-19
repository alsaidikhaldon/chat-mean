import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}

    createAccount(user){
     return  this._http.post('http://localhost:3000/register', user);


    }
     
   


  
}
