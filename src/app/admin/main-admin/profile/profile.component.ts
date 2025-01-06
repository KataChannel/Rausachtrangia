import { Component, OnInit, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../users/auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../users/auth/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  _AuthService: AuthService = inject(AuthService)
  _UsersService: UsersService = inject(UsersService)
  _Router: Router = inject(Router)
  Profile: any = {}
  ngOnInit() {
    this._UsersService.getProfile()
    this._UsersService.profile$.subscribe((data) => {
      if (data) {
        this.Profile = data
      }
    })
  }
  Dangxuat() {
    const result = this._AuthService.Dangxuat()
    if (result) {
      window.location.href = '/'
    }

  }

}
