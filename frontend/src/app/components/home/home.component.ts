import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogeddIn : boolean = false ;

  constructor( private _router : Router,  private _userService : UserService ) {
   


   }

  ngOnInit() {

    this._userService.user().subscribe((resp : any) => {

      if(resp.success){ 
        this.isLogeddIn = true;
        console.log("from home  "  + this.isLogeddIn);
        
        
       }
      
    });

    
  }





}
