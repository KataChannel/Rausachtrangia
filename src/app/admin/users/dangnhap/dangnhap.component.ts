import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }
  User: any = {}
  _AuthService: AuthService = inject(AuthService)
  _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  _Router: Router = inject(Router);
  // emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  ngOnInit() { }
  async Dangnhap() {
    if (!this.User.SDT) {
      this._snackBar.open('Vui lòng nhập Số Điện Thoại', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'danger',
        duration: 2000,
      });
    }
    else if (!this.phoneRegex.test(this.User.SDT)) {
      this._snackBar.open('Số Điện Thoại Không Hợp Lệ', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'danger',
        duration: 2000,
      });
    }
    else if (!this.User.password) {
      this._snackBar.open('Vui lòng nhập Mật Khẩu', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'danger',
        duration: 2000,
      });
    }
    else {
      const result = await this._AuthService.Dangnhap(this.User)
      console.log(result);
      if (result[0]) {
        const redirectURL = this._ActivatedRoute.snapshot.queryParamMap.get('redirectURL');
        if (redirectURL) {
          this._Router.navigateByUrl(redirectURL);
        }
        else { window.location.href = "/" }
      }
      else {
        this._snackBar.open(result[1], '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'danger',
          duration: 2000,
        });
      }
      
    }
  }
}
