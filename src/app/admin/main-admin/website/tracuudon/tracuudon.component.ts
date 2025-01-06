import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GiohangService } from '../giohang/giohang.service';
import { ForminAdminComponent } from '../../../../../formin/formin-admin/formin-admin.component';


@Component({
  selector: 'app-tracuudon',
  standalone:true,
  imports:[
    ForminAdminComponent
  ],
  templateUrl: './tracuudon.component.html',
  styleUrls: ['./tracuudon.component.css']
})
export class TracuudonComponent implements OnInit {
  _GiohangService: GiohangService = inject(GiohangService)
  MaDonHang:any
  Donhang:any
  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.MaDonHang = params['MaDonHang']
      console.log(params);
      this._GiohangService.SearchDonhang({MaDonHang:this.MaDonHang})
      this._GiohangService.donhang$.subscribe((data)=>{
        if(data){
          console.log(data);     
          this.Donhang = data
        }
      })
    });
  }
  ngOnInit() {}

}
