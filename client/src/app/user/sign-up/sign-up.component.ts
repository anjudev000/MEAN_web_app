import { Component,ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class SignUpComponent {
  emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  showSuccessMessage!:boolean;  // "Definite Assignment Assertion" (!) to tell TypeScript that the property will be assigned before it is used:
  showErrorMessage!:string
constructor(private userService:UserService){}

get user(): User {
  return this.userService.selectedUser;
}
onFileSelected(event: any):void{
  this.user.profilePic = event.target.files[0];
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.user.profilePic);
}


onSubmit(form: NgForm) {
  this.userService.postUser(this.user).subscribe(
    res =>{
      this.showSuccessMessage = true;
      setTimeout(()=> this.showSuccessMessage=false,4000);
      this.resetForm(form);
    },
    err =>{
      if(err.status === 422){
        this.showErrorMessage = err.error.join('<br/>');
      }
      else{
        this.showErrorMessage = 'Something went wrong'   // errors in the server side other than validation errors
      }
    }
  )
    console.log(form.value); // Access form values
  }

  resetForm(form:NgForm){
    this.userService.selectedUser = {
      fullName:'',
      email:'',
      password:'',
      profilePic: ''
    };
    form.resetForm();
    this.showErrorMessage = '';
  }

}
