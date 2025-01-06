import { Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
import { GiohangService } from '../../admin/main-admin/website/giohang/giohang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-sanphamblock',
  standalone:true,
  imports:[
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './sanphamblock.component.html',
  styleUrls: ['./sanphamblock.component.css']
})
export class SanphamblockComponent implements OnInit {
  @Input() Detail:any={}
  @Input() isMuangay:boolean =true
  _SanphamService:SanphamService = inject(SanphamService)
  _GiohangService: GiohangService = inject(GiohangService);
  constructor(
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    // this.Detail.Title = this.Detail.Title+"\n aa"
  }
  AddtoCart(data:any)
  { 
    let item:any={}
    item = data
    item.Giachon = data.Giagoc[0]
    item.Giachon.SLTT = data.Giagoc[0].khoiluong
    item.Soluong=1    
    this._GiohangService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
}
