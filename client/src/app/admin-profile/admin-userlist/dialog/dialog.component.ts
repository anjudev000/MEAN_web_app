import { Component,Inject,AfterViewInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import {MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUserlistComponent } from '../admin-userlist.component';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  dialogComp!:any;
  userForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private adminService: AdminService,
    private dialogRef:MatDialogRef<DialogComponent>,
    private snackBar:MatSnackBar
    ){}
  ngOnInit():void{
    this.userForm = this.formBuilder.group({
      fullName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    
    
  }
  // ngAfterViewInit() {
  //   // Call the parent component's method after the view is initialized
  //   this.callParentMethod();
  // }

  callParentMethod() {
    // Access the parent component using ViewChild
    const parentComponent = this.dialogComp.AdminUserlistComponent;
    parentComponent.getAllUsers(); // Call the desired method in the parent component
  }

  addUser(){
    console.log(this.userForm.value);
    if(this.userForm.valid){
      this.adminService.adduser(this.userForm.value).subscribe({
        next:(res)=>{
          this.snackBar.open('User added successfully', 'Close', {
            duration: 3000, // Duration in milliseconds (e.g., 3000 = 3 seconds)
            panelClass: 'success-snackbar' // Optional CSS class for custom styling
          });
          this.userForm.reset();
          this.dialogRef.close('user saved');
          this.callParentMethod();
  
          
        },
        error:()=>{
          alert("Error occured while adding the user");
        }
      })
    }
  }

  
 
}
