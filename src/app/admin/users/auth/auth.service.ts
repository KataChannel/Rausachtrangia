import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { AuthUtils } from './auth.utils';
import { isPlatformBrowser } from '@angular/common';
import { UsersService } from './users.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { environment } from '../../../../environments/environment';
@Injectable()
export class AuthService {
  private readonly _secret: any;
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  constructor(
    private _userService: UsersService,
    private _LocalStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this._secret = 'rausachtrangia';
  }
  set accessToken(token: string) {
    this._LocalStorageService.setItem('token', token);
  }
  get accessToken(): string {
   return this._LocalStorageService.getItem('token') ?? '';
  }
  async Dangnhap(user: any){
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        };
        const response = await fetch(`${environment.APIURL}/users/dangnhap`, options);  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();  
      if (data[0]) {
          this._authenticated = true;
          this.accessToken = data[1].access_token;
       }
       return data
    } catch (error) {
        return console.error(error);
    }
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      this._LocalStorageService.removeItem('token');
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }
  Dangxuat() {
    this._LocalStorageService.removeItem('token')
    this._authenticated = false;
    return true;
  }
}
