import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { json } from 'express';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
   roles = ["Admin", "User"];
  
  signupUser:any[]=[];
  signupObj:any={
    userName:'',
    phoneNumber:'',
    password:'',
    userType: this.roles[1] 
      
  };
  loginObj:any={
    userName:'',
    password:''  
  };


  constructor(private router: Router, private http: HttpClient) {
   
  }

  ngOnInit(): void {
    const localData=localStorage.getItem('signupUser');
    if(localData !=null){
      this.signupUser=JSON.parse(localData);
    }
  }

  // onlogin(){
  //   const isUserExist=this.signupUser.find(m =>m.userName==this.loginObj.userName
  //     && m.password == this.loginObj.password
  //     );
  //     if(isUserExist !=undefined){
  //       alert('User Login Successfully')
  //     }
  //     else{
  //       alert('Wrong Credentials')
  //     }
  // }
  onLogin(){
    debugger;
    this.http.post("http://localhost:4000/login", this.loginObj).subscribe((response: any)=>{
      debugger;
      if(response.result) {
        alert(response.message)
        this.router.navigateByUrl('/home');
      } else {
        alert(response.message)
      }
    })

}

}

