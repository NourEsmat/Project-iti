import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
 @Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })


export class LoginComponent {
UserService:any;
constructor(ps:UserService){
  this.UserService=ps;
}
Usertype:any;

onSubmit(form: User){
  console.log(this.UserService.Login(form).subscribe(
    (response: any) => {
      console.log('Login:', response);
      this.Usertype=response.userType;
    },
    (error: any) => {
      console.error('Error ', error);
  })
  ); 
  console.log(this.Usertype);
}
}
