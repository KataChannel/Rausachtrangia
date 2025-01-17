import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DonhangsService } from '../../../donhang/listdonhang/listdonhang.service';

@Component({
  selector: 'app-camon',
  standalone:true,
  templateUrl: './camon.component.html',
  styleUrls: ['./camon.component.css']
})
export class CamonComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  MaDonHang:any
  _DonhangsService:DonhangsService = inject(DonhangsService)
  ngOnInit() {
    this._DonhangsService.ClearDonhang()
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.MaDonHang = params['MaDonHang']
    });
  }

}
