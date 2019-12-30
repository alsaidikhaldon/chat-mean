import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from "../../services/message.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   userLoggedFirstName : string ="";
   userLoggedLastName : string  ="";
   
   userOnline : string  ="";

   contacts : any;

   conversationId : string= "";


  constructor( 
    private _userService : UserService, 
    private _messageServeice : MessageService, 
    private _router : Router
    ) { 



 
   

  }

  ngOnInit() {

    

    this._userService.users()
    .subscribe((resp : any) => {
     
     this.contacts = resp.users;
   
    });


    
   


  }


  getConversation(participantid){

    this._messageServeice.getConversationByPart(participantid)
    .subscribe((resp : any) => {
      if (resp.success) { 
        this.conversationId  = resp.partConversation._id;
        console.log("conversation id retuen by user : " + this.conversationId);
        return  this._router.navigate(['/conversation', this.conversationId]); 
       
        
      }
      
    });

    console.log("participate id : " + participantid);
    


  }

  


}
