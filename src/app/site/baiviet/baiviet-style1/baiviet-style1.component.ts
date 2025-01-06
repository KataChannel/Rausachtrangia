import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { BaivietBottomsheetComponent } from '../baiviet-bottomsheet/baiviet-bottomsheet.component';
import { BaivietAdminService } from '../../../admin/main-admin/baiviet-admin/baiviet-admin.service';
@Component({
  selector: 'app-baiviet-style1',
  standalone:true,
  imports:[
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatBottomSheetModule,
    DatePipe
  ],
  templateUrl: './baiviet-style1.component.html',
  styleUrls: ['./baiviet-style1.component.css']
})
export class BaivietStyle1Component implements OnInit {
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService);
  ListBaiviet:any={}
  FilterBaiviet:any[]=[]
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  Sorting:any[]=[
    {id:1,Title:"Mới Nhất"},
    {id:2,Title:"Cũ Nhất"},
    {id:3,Title:"Thịnh Hành"},
    {id:4,Title:"Bán Chạy"},
    {id:5,Title:"Đánh Giá Cao"},
  ]
  LocDanhmuc:any[]=[
    {id:1,Title:"Đặc Sản Rau Rừng"},
    {id:2,Title:"Trái Cây Các Loại"},
    {id:3,Title:"Các Loại Nấm"},
  ]
  LocThuongHieu:any[]=[
    {id:1,Title:"Rau Sạch Trần Gia"},
  ]
  constructor(private _bottomSheet: MatBottomSheet) {}
  openBottomSheet(): void {
    this._bottomSheet.open(BaivietBottomsheetComponent);
  }
  async ngOnInit() {
    this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
    this.FilterBaiviet = this.ListBaiviet.items
    console.log(this.ListBaiviet);
    
  }

}
