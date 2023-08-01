import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../shared/admin.service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private adminService:AdminService,private router:Router){
   
  }
  

  model={
    email:'',
    password:''
  };
  emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  serverErrorMessages:string='';

  onSubmit( form : NgForm ) {
    this.adminService.login(form.value).subscribe(
      res=>{
        this.adminService.setToken((res as LoginResponse).token);
        this.router.navigateByUrl('/adminProfile')
      },
      err=>{
        this.serverErrorMessages = err.error.message;
      }
    )
  }
}
