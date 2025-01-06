import { Component, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';

@Component({
  selector: 'app-sanphamyeuthich',
  standalone:true,
  imports:[],
  templateUrl: './sanphamyeuthich.component.html',
  styleUrls: ['./sanphamyeuthich.component.css']
})
export class SanphamyeuthichComponent implements OnInit {
  _SanphamService:SanphamService = inject(SanphamService)
  Lists: any={}
  FilterLists: any[] = []
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  constructor() { }

  async ngOnInit() {
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterLists = this.Lists.items
  }

}
