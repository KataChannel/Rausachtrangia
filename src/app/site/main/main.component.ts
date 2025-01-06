import { Component, HostBinding, HostListener, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LienheAdminService } from '../../admin/main-admin/admin-lienhe/admin-lienhe.service';
import { FormsModule } from '@angular/forms';
import { SiteCtaComponent } from '../../admin/main-admin/admin-cta/site-cta/site-cta.component';
import { MainService } from './main.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  standalone:true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MatMenuModule,
    FormsModule,
    SiteCtaComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @HostListener('window:scroll')
  onScroll() {
    const offset = 80;    
    if (window.scrollY > offset) {
      this.isSticky =true
    } else {
      this.isSticky =false 
    }
  }
  isSticky:boolean=false
  @ViewChild('drawer') drawer!: MatSidenav;
  Detail:any={}
  _LienheAdminService:LienheAdminService = inject(LienheAdminService)
  _MainService:MainService = inject(MainService)
  constructor(private _snackBar: MatSnackBar) { }
  async ngOnInit(): Promise<void> {
    // const IP = await this._MainService.getIP()
    // await this._MainService.CreateIP(IP)
    // const Visitors = await this._MainService.getAllVisitor()
    // console.log(IP);
    // console.log(Visitors);
  }

  CreateLienhe() {
    this.Detail.Type={Title:'Đăng Ký Nhận Tin',Slug:'dang-ky-nhan-tin'}
    this._LienheAdminService.CreateLienheAdmin(this.Detail).then(()=>
    {
      this.Detail={}
      this._snackBar.open('Gửi Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
}
