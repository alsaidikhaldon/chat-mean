import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
 
  
  firstName : string;
  lastName : string;
  email : string;
  password : string;

  submitted = false;
  message : string;

  constructor( 
    private _userServices : UserService,
    private _router : Router
    
     ) { }

  ngOnInit() {
  }

   // form validation
   registerForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',  [ Validators.required, Validators.email ]),
    password : new FormControl('',[ Validators.required, Validators.minLength(6) ])
  }); 




  onRegister(){

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
   
    // creat newUser object
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    

    this._userServices.createAccount(newUser).subscribe((resp : any) => {
      if(resp.success){ 
        this.message = "Creat account with succes .. you will redirect to login page automaticlly";

        return setTimeout(() => {  this._router.navigate(['/login']); }, 4000);

      }else{
         this.message = resp.msg;
        }
    });
  }

}

  
