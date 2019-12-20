import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  message : string;

  email : string;
  password : string;

  constructor(
    private _userServices : UserService,
    private _router : Router
  ) { }

  ngOnInit() {
  }


  // form validation
  loginForm = new FormGroup({
   
    email : new FormControl('',  [ Validators.required, Validators.email ]),
    password : new FormControl('',Validators.required)
  }); 




  
  onLogin(){

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }

    // creat newUser object
    const userAuth = {
      email: this.email,
      password: this.password
    }
   
  this._userServices.auth(userAuth).subscribe((resp : any) => {

    if(resp.success){ 
      this.message = resp.msg;
      return setTimeout(() => {  this._router.navigate(['/main']); }, 4000);
    }else{
       this.message = resp.msg;
      }
    
  });

    
  }


}
