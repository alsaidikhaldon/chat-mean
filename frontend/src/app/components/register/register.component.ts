import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname : string;
  lastname : string;
  email : string;
  password : string;

  constructor() { }

  ngOnInit() {
  }

  onRegister(){
    console.log("onRegister working");
    
  }

}
