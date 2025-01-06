import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-camon',
  standalone:true,
  templateUrl: './camon.component.html',
  styleUrls: ['./camon.component.css']
})
export class CamonComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  MaDonHang:any
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.MaDonHang = params['MaDonHang']
    });
  }

}
