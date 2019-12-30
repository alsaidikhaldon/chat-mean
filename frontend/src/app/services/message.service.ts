import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http: HttpClient) { }




  getConversationByPart(participantid){
    return this._http.get('http://localhost:3000/getconversation/' + participantid ,{
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  addMessage(message: any){
    console.log("from services " +message );
    
    return this._http.post('http://localhost:3000/message/add' ,message, {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }










}
