import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreadcrumbadminComponent } from '../../../../breadcrumb/breadcrumbadmin/breadcrumbadmin.component';
import { LocalStorageService } from '../../../../shared/localstorage.service';
import { UsersService } from '../../auth/users.service';

@Component({
  selector: 'app-changepassword',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
 _UsersService: UsersService = inject(UsersService);
  _LocalStorageService: LocalStorageService = inject(LocalStorageService);
  User: any = {}
  Token:any=this._LocalStorageService.getItem('token') ?? null;
  ListProfile:any[]=[
    {id:1,Title:'Thông Tin Chung', Slug:'general',Ordering:1},
    {id:2,Title:'Đổi Mật Khẩu', Slug:'changepassword',Ordering:2},
    {id:3,Title:'Mạng Xã Hội', Slug:'social',Ordering:3}
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
          console.log(this.User); 
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
