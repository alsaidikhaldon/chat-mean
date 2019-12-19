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


  // form validation
   registerFormValidation = new FormGroup({
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl('',Validators.required),
    email : new FormControl('',  [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
    

  }); 

  firstName : string;
  lastName : string;
  email : string;
  password : string;
  message : string;

  constructor( 
    private _userServices : UserService,
    private _router : Router 
     ) { }

  ngOnInit() {
   
  }

  

  onRegister(){
    if(!this.firstName || !this.lastName || !this.email || !this.password){
      console.log("all fields are necessary");
    }
   
    
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    console.log(" info come from  FORM  " + newUser.firstName  );

    this._userServices.createAccount(newUser).subscribe(resp => {
      if(resp.success){ 
        this.message = "Creat account with succes";
        return this._router.navigate(['/login']);
      }else{
         this.message = resp.msg;
        }
    });
  }

}

  
