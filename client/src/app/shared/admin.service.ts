import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }


  //http methods

  login(authcredentials:any){
    return this.http.post(environment.adminApiBaseUrl + '/login',authcredentials,this.noAuthHeader);
  }
  getAdminProfile(){
    return this.http.get(environment.adminApiBaseUrl + '/adminProfile');
  }
  getUserDetails(){
    return this.http.get(environment.adminApiBaseUrl+'/userList');
  }
  adduser(userData: any){
    return this.http.post(environment.adminApiBaseUrl + '/addUser',userData);
  }

  deleteUser(id :any){
    return this.http.post(environment.adminApiBaseUrl+'/deleteUser/'+id,{});
  }


  //helper methods

  setToken(adminToken:string){
    localStorage.setItem('admintoken',adminToken);
  }
  getToken(){
    return localStorage.getItem('admintoken');
  }
  deleteToken(){
    localStorage.removeItem('admintoken');
  }
  getPayload(){
    let admintoken = localStorage.getItem('admintoken');
    if(admintoken) {
      let adminPayload = atob(admintoken.split('.')[1]);
      return JSON.parse(adminPayload);
    }
    else{
      return null;
    }
  }
  isLoggedIn(){
    let adminPayload = this.getPayload();
    if(adminPayload) return adminPayload.exp > Date.now()/1000;
    else return false;
  }
}
