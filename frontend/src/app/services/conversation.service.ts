import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private _http: HttpClient) { }


  getConvByUser(){
    return this._http.get('http://localhost:3000/myconversation' ,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });


  }

  getConvInfo(convId){

    return this._http.post('http://localhost:3000/conversationinfo/'+convId ,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });


  }



}
