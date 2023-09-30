import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpComponent } from './sign-up/sign-up.component';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  roles=['Admin','User'];
  signupUser:any[]=[];
  signupObj:any={
    userName:'',
    phoneNumber:'',
    password:'',
    userType: '' 
      
  };

  constructor(private http:HttpClient) {}
SignUp(p:any):Observable<any>{
  return this.http.post(`http://localhost:4000/sign-up`,p)
}
Login(p:any):Observable<any>{
  return this.http.post(`http://localhost:4000/login`,p)
}

}
