import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { UsersService } from '../auth/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    //AvatarComponent,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _UsersService: UsersService = inject(UsersService);
  _LocalStorageService: LocalStorageService = inject(LocalStorageService);
  User: any = {}
  Token:any=this._LocalStorageService.getItem('token') ?? null;
  ListProfile:any[]=[
    {id:1,Title:'Thông Tin Chung', Slug:'general',Ordering:1},
    {id:2,Title:'Đổi Mật Khẩu', Slug:'changepassword',Ordering:2},
    {id:3,Title:'Mạng Xã Hội', Slug:'social',Ordering:3},
    {id:4,Title:'Đơn hàng Của Tôi', Slug:'myorder',Ordering:3},
    {id:4,Title:'Admin', Slug:'/admin',Ordering:4},
  ]
  breadcrumb = [
    { title: 'Trang Chủ', Slug: '/' },
    { title: 'Profile', Slug: 'profile'}
  ]
  constructor(private _snackBar: MatSnackBar) {
    if(this.Token)
    {
      this._UsersService.getProfile().then((data) => {
        if (data) {
          this.User = data
          this.User.Image.src = this.User.Image.Main
         // console.log(this.User); 
        }
      })
    }
  }
  ngOnInit() {
  }
  CheckNoti()
  {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
  }
  GetUpload(e:any)
  {
    console.log(e.src);
    
    this.User.Image.Main = e.src
    this._UsersService.updateOneUser(this.User).then(()=>{
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
    this._UsersService.updateOneUser(this.User).then(()=>{
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    });
  }

}
