import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AdminService } from '../shared/admin.service';
import { NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private adminService:AdminService,private router : Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.adminService.isLoggedIn()) {
        const url = (event as NavigationStart).url;
        if (url.includes('adminSignIn')) {
          this.router.navigateByUrl('/adminProfile');
        }
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if (!this.adminService.isLoggedIn()) {
        this.router.navigateByUrl('/adminSignIn');
        this.adminService.deleteToken();
        return false;
      }else if (state.url.includes('adminSignIn')) {
        // User is logged in but trying to access sign-in page, redirect to admin profile page
        this.router.navigateByUrl('/adminProfile');
        return false;
      }
    return true;
  }
}


