import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListUsers } from '../listusers';
import { ListUsersComponent } from '../listusers.component';
import { UserssService } from '../listusers.service';
import { UsersService } from '../../auth/users.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
  @Component({
    selector: 'app-detailusers',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      CommonModule
    ],
    templateUrl: './detailusers.component.html',
    styleUrl: './detailusers.component.scss'
  })
  export class DetailUsersComponent {
    _ListusersComponent:ListUsersComponent = inject(ListUsersComponent)
    _UsersService:UsersService = inject(UsersService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={}
    isEdit:boolean=false
    isDelete:boolean=false
    idUsers:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idUsers = data.get('id')
        console.log(this.idUsers);   
        this.isEdit = this.idUsers === '0';   
        if (this.idUsers&&this.idUsers!='0') {
          this._ListusersComponent.drawer.open();  
          this._UsersService.getUserByid(this.idUsers).then((data: any) => {
            if(data){
              this.Detail = data;
            }
          });
        } else if(this.idUsers=='0'){    
          this.Detail = {}
          this._ListusersComponent.drawer.open();  
        }
          else {
          this._ListusersComponent.drawer.close();  
        }
      });   
    }
    SaveData()
    {
      if(this.idUsers=='0')
      {
        this._UsersService.Dangky(this.Detail).then((data:any)=>{
          console.log(data);
          if(data[0]){
            this._snackBar.open('Tạo Mới Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
          else {
            this._snackBar.open(data[1], '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-warning'],
            });
          }
         
        })
      }
      else
      {
        this._UsersService.updateOneUser(this.Detail).then((data:any)=>{
          if(data){
            this._snackBar.open('Cập Nhật Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
          }
        })
      }
    }
    DeleteData(){

    }
    newPass:any=''
    ResetPass(){
      this._UsersService.Randompass(this.Detail).then((data:any)=>{
        if(data){
          if(data[0]){
            this.newPass = data[1]
          }
        }})      
    }
  }