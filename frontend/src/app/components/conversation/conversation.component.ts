import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  userLoggedId : string="" ;
  userLoggedfn : string="" ;
  messages : any;



  constructor( private _userServeice : UserService, private _router : Router,  private _route: ActivatedRoute ) {

    var convid = this._route.snapshot.paramMap.get('convid');
    
    this._userServeice.messagesByConversation(convid)
    .subscribe((resp : any) => {
      if (resp.success) { 
        this.messages  = resp.messages;  
        console.log(this.messages);
        
        
      }
    });



    this._userServeice.user()
    .subscribe((resp : any) => {
      if (resp.success) { 
        this.userLoggedId = resp.user.id;
       
       
      
      }
      console.log(" id user logged 111 " + this.userLoggedId );
      
    });
    
    
    
    

   }

  ngOnInit() {

   
    
  }
  
}
