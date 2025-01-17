import { Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonhangsService } from '../../admin/donhang/listdonhang/listdonhang.service';
@Component({
  selector: 'app-sanphamblock',
  standalone:true,
  imports:[
    CommonModule,
    MatTooltipModule,
    //NgOptimizedImage
  ],
  templateUrl: './sanphamblock.component.html',
  styleUrls: ['./sanphamblock.component.css']
})
export class SanphamblockComponent implements OnInit {
  @Input() Detail:any={}
  @Input() isMuangay:boolean =true
  _SanphamService:SanphamService = inject(SanphamService)
  _DonhangsService: DonhangsService = inject(DonhangsService);
  constructor(
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {   
    // this.Detail.Title = this.Detail.Title+"\n aa"
  }
  AddtoCart(data:any)
  { 
    console.log(data);
    
    let item:any={}
    item = data.Giagoc.find((v:any)=>v.default == true)||data.Giagoc[0]
    // item.Giachon = data.Giagoc[0]
    // item.Giachon.SLTT = data.Giagoc[0].khoiluong
    item.Soluong=1
    item.Title = data.Title
    item.Image = data?.Image?.Hinhchinh?.src
    this._DonhangsService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    })
  }
}
