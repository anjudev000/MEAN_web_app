import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminUserlistComponent } from './admin-profile/admin-userlist/admin-userlist.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';



const routes: Routes = [
  {
    path: 'signup',component:UserComponent,
    children:[{path:'',component:SignUpComponent}]
  },
  {
    path: 'login',component:UserComponent,
    children:[{path:'',component:SignInComponent}]
  },
  {
    path: 'usserprofile',component:UserProfileComponent,canActivate:[AuthGuard]
  },
 
  {path:'adminSignIn',component:AdminLoginComponent},
  {path: 'adminProfile',component:AdminProfileComponent,canActivate:[AdminAuthGuard]},
  {path:'admin-UsersList',component:AdminUserlistComponent,canActivate:[AdminAuthGuard]},
  // {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
