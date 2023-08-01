//built-in imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';



//components imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './shared/user.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminUserlistComponent } from './admin-profile/admin-userlist/admin-userlist.component';
import { DialogComponent } from './admin-profile/admin-userlist/dialog/dialog.component';
import {MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

// angular material 

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAuthGuard } from './auth/admin-auth.guard';

import { AdminService } from './shared/admin.service';
import { AdminAuthInterceptor } from './auth/adminAuth.interceptor';
import { EditDialogComponent } from './admin-profile/admin-userlist/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    AdminLoginComponent,
    AdminProfileComponent,
    AdminUserlistComponent,
    DialogComponent,
    EditDialogComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSnackBarModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminAuthInterceptor,
    multi: true
  },
  AuthGuard,UserService,AdminAuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
