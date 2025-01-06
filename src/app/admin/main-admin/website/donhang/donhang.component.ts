import { Component, OnInit, inject } from '@angular/core';
import { GiohangService } from '../giohang/giohang.service';
@Component({
  selector: 'app-donhang',
  standalone: true,
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.css']
})
export class DonhangComponent implements OnInit {
  _GiohangService: GiohangService = inject(GiohangService)
  Giohangs: any[] = []
  Phivanchuyen: any = 10
  Giamgia: any = 30
  constructor() { }

  ngOnInit() {
    this._GiohangService.getGiohangs()
    this._GiohangService.giohang$.subscribe((data: any) => {
      console.log(data)
      this.Giohangs = data
    })
  }
  GetTotal(data: any, field: any, field1: any) {
    if (field1) {
      return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1], 0) || 0;
    }
    else {
      return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
    }
  }
  GetTongcong() {
    return this.GetTotal(this.Giohangs, 'Soluong', 'Giagoc') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Giohangs, 'Thue', '')
  }
}
