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



        
    logout(){
      return  this._http.get('http://localhost:3000/logout' ,{
        observe:'body',
        withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      });
      
     }



     user(){
       return this._http.get('http://localhost:3000/user' ,{
         observe:'body',
         withCredentials: true,
         headers: new HttpHeaders().append('Content-Type','application/json')
       });
     }


     users(){
      return this._http.get('http://localhost:3000/users' ,{
        observe:'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type','application/json')
      });
    }



    messagesByConversation(convId : any){
      return this._http.get('http://localhost:3000/conversation/' + convId ,{
        observe:'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type','application/json')
      });
    }


    getUserInfoById(userId : any){
      
        return this._http.get('http://localhost:3000/userInfo/'+userId, {
          observe:'body',
          withCredentials: true,
          headers: new HttpHeaders().append('Content-Type','application/json')
        });
      
    }







    
   



    



    






    //  home(){
    //   return  this._http.get('http://localhost:3000/message/list',{
    //     observe:'body',
    //     withCredentials:true,
    //   headers:new HttpHeaders().append('Content-Type','application/json')
    //   });
    //  }


     
     
   


  
}
