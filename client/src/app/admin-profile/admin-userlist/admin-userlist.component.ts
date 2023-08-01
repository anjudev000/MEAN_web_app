import { Component,AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AdminService } from 'src/app/shared/admin.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
// import Swal from 'sweetalert2';






@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class AdminUserlistComponent {
  @ViewChild(DialogComponent) dialogComp! : DialogComponent;

  displayedColumns: string[] = ['fullName', 'email','profilePic','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private adminService:AdminService,@Inject(MAT_DIALOG_DATA) public data: any){}
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    });
  }
  ngOnInit():void{
    this.getAllUsers();
    console.log("hellllooooooooooooo",this.data);
  }
  

  getAllUsers(){
    this.adminService.getUserDetails().subscribe({
      next:(res:any)=>{
        console.log(res);
        const dataArray: any[] = res.userData; 
        this.dataSource = new MatTableDataSource(dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error while fetching records");
      }
    })
  }
editUser(row:any){
  this.dialog.open(EditDialogComponent,{
    width:'30%',
    data:row
})
}
deleteUser(id:any){
 
  
  this.adminService.deleteUser(id).subscribe({
    next:(res)=>{
      alert('User deleted successfully.');
      this.getAllUsers();
    },
    error:()=>{
      alert('Error while deleting the record.');
    }
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
