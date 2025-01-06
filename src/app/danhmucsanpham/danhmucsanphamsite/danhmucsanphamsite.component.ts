import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';

@Component({
  selector: 'app-danhmucsanphamsite',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './danhmucsanphamsite.component.html',
  styleUrls: ['./danhmucsanphamsite.component.css']
})
export class DanhmucsanphamsiteComponent implements OnInit {
  SearchParams: any = {
    Status:1,
    pageSize: 50,
    pageNumber: 0,
    Type:'sanpham'
  };
  Danhmucs: any = {}
  _DanhmucService: DanhmucService = inject(DanhmucService);
  constructor() { }

  async ngOnInit() {
    this.Danhmucs = await this._DanhmucService.SearchDanhmuc(this.SearchParams)    
  }

}
