import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListkhachhangComponent } from '../listkhachhang.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { KhachhangsService } from '../listkhachhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
  @Component({
    selector: 'app-detailkhachhang',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule
    ],
    templateUrl: './detailkhachhang.component.html',
    styleUrl: './detailkhachhang.component.scss'
  })
  export class DetailKhachhangComponent {
    _ListkhachhangComponent:ListkhachhangComponent = inject(ListkhachhangComponent)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    _KhachhangsService:KhachhangsService = inject(KhachhangsService)
    constructor(){}
    Detail:any= signal<any>({});
    isEdit:boolean=false
    isDelete:boolean=false
    idKhachhang:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idKhachhang = data.get('id')
        this.isEdit = this.idKhachhang === '0';   
        if (this.idKhachhang&&this.idKhachhang !== '0') {
          this._ListkhachhangComponent.drawer.open();
          await this._KhachhangsService.getKhachhangByid(this.idKhachhang);     
          this.Detail = this._KhachhangsService.Khachhang
        } 
      });   
    }
    SaveData()
    {
      if(this.idKhachhang=='0')
      {

      }
      else
      {
        this._KhachhangsService.updateOneKhachhang(this.Detail())
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
      }
     // this.isEdit=false  
    }
    goBack()
    {
      this._route.navigate(['/admin/khachhang'])
    }
  }