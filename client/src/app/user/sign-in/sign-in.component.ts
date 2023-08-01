import { Component,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class SignInComponent {
  constructor (private userService: UserService,private router: Router){}
model = {
  email :'',
  password :''
};
emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
serverErrorMessages:string='';

ngOnInit(){
  if(this.userService.isLoggedIn()){
    this.router.navigateByUrl('/usserprofile');
  }
}

onSubmit(form: NgForm){
  
 this.userService.login(form.value).subscribe(
  (res) => {
    console.log('Login successful. Response:', res);
    this.userService.setToken((res as LoginResponse).token);
    this.router.navigateByUrl('/usserprofile');
  },
  err =>{
    console.log("errorr again agian and againnn");
    this.serverErrorMessages = err.error.message;
    }
  )
}
}
