import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
//import { environment } from '../../environments/environment';


interface UserProfileResponse {
  user: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserProfileComponent implements OnInit {
  userDetails:any;
 baseUrl:string='http://localhost:3000/public/userImages'
constructor(private userService:UserService,private router:Router){}


ngOnInit(){
  this.userService.getUserProfile().subscribe(
    res=>{
      console.log("helllooooo anjuuuuuuuuuuuuuuuuuu");
      this.userDetails = (res as UserProfileResponse).user;
      console.log("ppppppppppppppppppp",this.userDetails.profilePic);
    },
    err=>{
      console.log(err.message);
    }
  )
}
onLogout(){
  this.userService.deleteToken();
  this.router.navigateByUrl('/login');
}
}
