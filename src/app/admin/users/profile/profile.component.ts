import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { UsersService } from '../auth/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    AvatarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _UsersService: UsersService = inject(UsersService);
  _LocalStorageService: LocalStorageService = inject(LocalStorageService);
  User: any = {}
  Token:any=this._LocalStorageService.getItem('token') ?? null;
  constructor(private _snackBar: MatSnackBar) {
    if(this.Token)
    {
      this._UsersService.getProfile()
      this._UsersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data
          this.User.Image.src = this.User.Image.Main
          console.log(this.User); 
        }
      })
    }
  }
  ngOnInit() {
  }
  GetUpload(e:any)
  {
    console.log(e.src);
    
    this.User.Image.Main = e.src
    this._UsersService.UpdateUser(this.User).then(()=>{
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    });;
  }
  UpdateProfile()
  {
    this._UsersService.UpdateUser(this.User).then(()=>{
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    });
  }

}
