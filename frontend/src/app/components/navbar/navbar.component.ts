import { Component, OnInit } from '@angular/core';

import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLogeddIn : boolean = false ;


  
  userLoggedFirstName : string ="";
  userLoggedLastName : string  ="";
  
  userOnline : string  ="";


  constructor( private _userService : UserService, private _router : Router ) { 


    
  

  }

  ngOnInit() {
    this._userService.user().subscribe((resp : any) => {

      if(resp.success){ 
        this.isLogeddIn = true;
        
       }
      
    });

    this.getCurrent();

    
  }

  
  logout(){
    this._userService.logout()
    .subscribe(
      (resp : any) => {console.log(resp);this._router.navigate(['/login'])},
      error => console.error(error)
      
    )
    
    
  }

  private getCurrent(){
    this._userService.user()
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

}
