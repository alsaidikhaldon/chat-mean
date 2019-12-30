import { Component, OnInit } from '@angular/core';
import { ConversationService } from "../../services/conversation.service";
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-myconversation',
  templateUrl: './myconversation.component.html',
  styleUrls: ['./myconversation.component.css']
})
export class MyconversationComponent implements OnInit {
  convs : any ;
  myConvs :any[];

  userLoggedId : string;
  myPart : string;
 


  constructor(private _convService : ConversationService,
              private _userService : UserService ) { }

  ngOnInit() {

    
    this._userService.user()
      .subscribe((resp: any) => {
        if (resp.success) {
          this.userLoggedId = resp.user.id;
        }

      
    });

    this.myConvsInfo();


    
   
  }



  myConvsInfo(){


    this.myConvs = [];
    this._convService.getConvByUser()
    .subscribe((resp : any) => {
    
     this.convs = resp.conversations;

     this.convs.forEach( conv => {
      var myConv = {
        convId : "",
        partFN : "",
        partLN : ""
       };
        myConv.convId =  conv._id;

        // if cuurent user sender or part
        if (this.userLoggedId == conv.participant ) {
        this.myPart = conv.createBy;
        } else {
          this.myPart = conv.participant;
        }
     
       // console.log("convs foreach => " +  conv.participant);
        this._userService.getUserInfoById(this.myPart)
        .subscribe((resp : any) => {
         myConv.partFN =  resp.info.firstName;
         myConv.partLN =  resp.info.lastName;
          
        });

        
        //puch convInfo object to myConvs array
        

        this.myConvs.push(myConv);
        console.log( this.myConvs);
        
        
       } );

      // this.myConvs = myConvsInfo;
      


    
    });

    

  }


  








}
