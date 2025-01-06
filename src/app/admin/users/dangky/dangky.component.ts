import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../auth/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangky',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  constructor() { }
  User:any={}
  _AuthService:AuthService=inject(AuthService)
  _UsersService:UsersService=inject(UsersService)
  _router: Router = inject(Router);
  ngOnInit() {
  }
  async Dangky()
  {
    const result = await this._UsersService.Dangky(this.User)
    console.log(result[0]);
    
    if(result[0])
    {
      this._router.navigate(['dangnhap']);
    }
    console.log(result);
    
  }

}
