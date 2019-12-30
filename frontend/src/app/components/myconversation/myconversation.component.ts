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
 


  constructor(private _convService : ConversationService,
              private _userService : UserService ) { }

  ngOnInit() {

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
     
       // console.log("convs foreach => " +  conv.participant);
        this._userService.getUserInfoById(conv.participant)
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
