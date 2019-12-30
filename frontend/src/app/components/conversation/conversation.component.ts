import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute,  Event, NavigationEnd, ParamMap, NavigationStart, RouterEvent} from '@angular/router';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  userLoggedId : string="" ;
  userLoggedfn : string="" ;
  messages : any;

  convId : any;

  eventSubscription: Subscription;



  constructor(
     private _userServeice : UserService, 
     private _router : Router,  
     private _route: ActivatedRoute, 
    ) {

      
    // get logged user id

    this._userServeice.user()
      .subscribe((resp: any) => {
        if (resp.success) {
          this.userLoggedId = resp.user.id;
        }

      
    });

    
    
   }

  ngOnInit() {
    this.getConversationDet();

//  this.eventSubscription = this._router.events.
    this.eventSubscription = this._router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (res instanceof NavigationEnd) {
        let idurl  = this._route.snapshot.paramMap.get('convid');
       // console.log("id from url event : " +idurl );
        //console.log("NavigationEnd  Event Event Event Event Event  Event Event Event Event Event ");
        this.getConversationDet();

        this._router.navigated = false;
        this.ngOnDestroy();
        
      }
    });


    // this._router.navigateByUrl('blank').then(() => {
      // this._router.navigateByUrl('conversation/5e080e0ad87f911cb036d34d');
    //   console.log('naviate to any route which you want');
    //  });


    
  }

  getConversationDet() {
    let convId  = this._route.snapshot.paramMap.get('convid');
    //console.log("id from url initial : " +convId );
    
    
  this._userServeice.messagesByConversation(convId)
  .subscribe((resp : any) => {
    if (resp.success) { 
      //console.log(resp.messages);
      
      this.messages  = resp.messages;  
      
    }
  });
  }



  ngOnDestroy() {
    this.eventSubscription.add();
  }
  
}
