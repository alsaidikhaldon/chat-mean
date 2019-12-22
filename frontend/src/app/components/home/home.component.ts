import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _router : Router,  private _userService : UserService ) {
    // this._userService.home().subscribe(
    //   (resp : any) => { 
    //   if(resp.success){console.log(resp);}
    //   else{this._router.navigate(['/login']);}
    //   });


   }

  ngOnInit() {
    
  }





}
