import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConversationService } from "../../services/conversation.service";
import { MessageService } from "../../services/message.service";
import { Router, ActivatedRoute,  Event, NavigationEnd, ParamMap, NavigationStart, RouterEvent} from '@angular/router';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  partFN : string="" ;
  partLN : string="" ;
  messages : any;

  convId : any;
  myPart : string;
  userLoggedId : string;

  eventSubscription: Subscription;

  content : string;

  registerForm = new FormGroup({
    content :  new FormControl('',[ Validators.required, Validators.maxLength(100) ])
  }); 
  submitted : boolean = false;
 



  constructor(
     private _userService : UserService,
     private _convService : ConversationService,
     private _messageService : MessageService, 
     private _router : Router,  
     private _route: ActivatedRoute, 
    ) {

      
    // // get logged user id

    this._userService.user()
      .subscribe((resp: any) => {
        if (resp.success) {
          this.userLoggedId = resp.user.id;
        }

      
    });

    
    
   }

  ngOnInit() {
    this.getpartInfo()
    this.getConversationDet();
    this.compEventChange();






    
  }

  getConversationDet() {
    let convId  = this._route.snapshot.paramMap.get('convid');
    //console.log("id from url initial : " +convId );
    
    
  this._userService.messagesByConversation(convId)
  .subscribe((resp : any) => {
    if (resp.success) { 
      //console.log(resp.messages);
      
      this.messages  = resp.messages;  
      
    }
  });
  }

  getpartInfo(){
     let convId  = this._route.snapshot.paramMap.get('convid');
     

     this._convService.getConvInfo(convId)
        .subscribe((resp : any) => {
         if (this.userLoggedId == resp.conversation.createBy ) {
          this.myPart = resp.conversation.participant;
         } else {
          this.myPart = resp.conversation.createBy;
         }
       
         this._userService.getUserInfoById( this.myPart)
         .subscribe((resp : any) =>{
          this.partFN =  resp.info.firstName;
          this.partLN =  resp.info.lastName;
         });
        
        });
        

        

      
        

       

    // if (this.userLoggedId == conv.participant ) {
    //   this.myPart = conv.createBy;
    //   } else {
    //     this.myPart = conv.participant;
    //   }

    

    
  }

  sendMessage(){

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
  let message = {
    convId: this._route.snapshot.paramMap.get('convid'),
    content: this.content
  }
  

  this._messageService.addMessage(message).subscribe((resp : any) =>{
    if (resp.success) {
      console.log(resp.msg); 
    }


  })
   console.log("message from input :" + this.content.length);
   

  }



  compEventChange(){

    
    this.eventSubscription = this._router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (res instanceof NavigationEnd) {
       // let idurl  = this._route.snapshot.paramMap.get('convid');
       // console.log("id from url event : " +idurl );
        //console.log("NavigationEnd  Event Event Event Event Event  Event Event Event Event Event ");
        this.getpartInfo();
        this.getConversationDet();
        this._router.navigated = false;
        this.ngOnDestroy();
      }
    });
  }



  ngOnDestroy() {
    this.eventSubscription.add();
  }
  
}
