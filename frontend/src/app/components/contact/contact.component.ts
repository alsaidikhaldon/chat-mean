import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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


  constructor( private _userServeice : UserService, private _router : Router) { 

    this._userServeice.user()
    .subscribe((resp : any) => {
      if (resp.success) { 
        this.userLoggedFirstName = resp.user.firstName;
        this.userLoggedLastName = resp.user.lastName;
        this.userOnline = "online";
        
      }else{
        this.userOnline = "offline";
        return  this._router.navigate(['/login']); 
      }
    });
   


  }

  ngOnInit() {

    

    this._userServeice.users()
    .subscribe((resp : any) => {
     this.contacts = resp.users;
     
    });


    
  

  }

  


}
