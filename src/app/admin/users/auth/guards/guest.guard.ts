import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of,switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router,
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const check =  this._check()    
    return check

  //  const redirectURL = state.url === '/dangxuat' ? '/' : state.url;
   // return this._check(redirectURL);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const redirectURL = state.url === '/dangxuat' ? '/' : state.url;
    return this._check();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    return this._check();
  }
  private _check() {
    const check = this._authService.checkDangnhap()
        if (check) {
          //this._notifierService.notify('error','Đang Đăng Nhập Tài Khoản')
          this._router.navigate(['']);
          return false;
        }
        return true;
    // return this._authService.checkDangnhap().pipe(
    //   switchMap((authenticated) => {
    //     if (authenticated) {
    //       //this._notifierService.notify('error','Đang Đăng Nhập Tài Khoản')
    //      // this._router.navigate(['/dangnhap'], { queryParams: { redirectURL } });
    //       return of(false);
    //     }
    //     return of(true);
    //   })
    // );
  }
}
