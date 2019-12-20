import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}

  




    createAccount(user : any){
     return  this._http.post('http://localhost:3000/register', user);
     
    }

    
    auth(user : any){
      return  this._http.post('http://localhost:3000/login', user, {
        observe:'body',
        withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      });
      
     }
     
   


  
}
