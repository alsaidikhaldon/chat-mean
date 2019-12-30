import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConversationComponent } from './components/conversation/conversation.component';

import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { MyconversationComponent } from './components/myconversation/myconversation.component';



const routes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conversation/:convid', component: ConversationComponent },
  { path: 'getconversation/:participantid', component: ConversationComponent },
  { path: '',  component: HomeComponent }
  
 
];



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    MainComponent,
    ContactComponent,
    ConversationComponent,
    MyconversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    ReactiveFormsModule
    
  ],
  providers: [
    UserService,
    MessageService

  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
