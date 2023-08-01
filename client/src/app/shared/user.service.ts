import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User = {
    fullName:'',
    email:'',
    password:'',
    profilePic: ''
  }
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};

  constructor(private http: HttpClient) {}

  // http methods

  postUser(user:User){
    const formData = new FormData();
    formData.append('fullName',user.fullName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('profilePic',user.profilePic);

    return this.http.post(environment.apiBaseUrl+'/register',formData,this.noAuthHeader);
  }
  login(authcredentials:any){
    return this.http.post(environment.apiBaseUrl+'/authenticate',authcredentials,this.noAuthHeader);
  }
  getUserProfile(){
    return this.http.get(environment.apiBaseUrl+'/usserprofile')
  }

  //helper methods

  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    let token = this.getToken();
    if(token){
      let userPayload = atob(token.split('.')[1]);
      console.log("hikiklooooooooooooo",userPayload);
      return JSON.parse(userPayload);
    }
    else return null;
  }
  isLoggedIn():boolean{
    let userPayload = this.getUserPayload();
    if(userPayload)
    {
      console.log("heellooo inside logged in function");
       return userPayload.exp > Date.now() / 1000;
    }
    else return false;
  }
}
