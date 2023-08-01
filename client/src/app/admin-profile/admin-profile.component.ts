import { Component } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { Router } from '@angular/router';


interface AdminProfileResponse {
  user: any;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  adminDetails:any;
constructor(private adminService:AdminService,private router:Router){}

ngOnInit(){
  this.adminService.getAdminProfile().subscribe(
    res=>{
      this.adminDetails= (res as AdminProfileResponse).user.email;
      console.log("aaaaaaaaaaa",this.adminDetails);
    },
    err=>{

    }
  )
}
  onLogout()
    {
      this.adminService.deleteToken();
      this.router.navigateByUrl('/adminSignIn');
    }
    navigateToUserList() {
      this.router.navigate(['/admin-UsersList']);
    }

}
