import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  constructor(private userService:UserService,@Inject(MAT_DIALOG_DATA) public editData:any){}

  ngOnInit():void{
    
    console.log("this is edit section",this.editData);
  }
}
