import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChuongtrinhkhuyenmaiAdminService } from '../../admin/main-admin/admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.service';
import { GiohangService } from '../../admin/main-admin/website/giohang/giohang.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-khuyenmaisite',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './khuyenmaisite.component.html',
  styleUrls: ['./khuyenmaisite.component.css']
})
export class KhuyenmaisiteComponent implements OnInit {
  @Input() MaKhuyenmai: any
  @Input() Donhang: any
  @Input() Role: any = 'Site'
  _GiohangService: GiohangService = inject(GiohangService)
  _ChuongtrinhkhuyenmaiAdminService: ChuongtrinhkhuyenmaiAdminService = inject(ChuongtrinhkhuyenmaiAdminService)
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.MaKhuyenmai);
  }
  async ApdungKhuyenmai() {
    const Khuyenmai = await this._ChuongtrinhkhuyenmaiAdminService.getChuongtrinhkhuyenmaiByCode(this.MaKhuyenmai)
    if (Khuyenmai) {
      console.log(Khuyenmai);
      this.Donhang.Khuyenmai =
      {
        "id": Khuyenmai.id,
        "Title": Khuyenmai.Title,
        "Code": Khuyenmai.Code,
        "Value": Khuyenmai.Value,
        "MinValue": Khuyenmai.MinValue,
        "LoaiKM": Khuyenmai.LoaiKM,
        "startDate": Khuyenmai.startDate,
        "endDate": Khuyenmai.endDate,
        "Type": Khuyenmai.Type,
      }
      if (this.Role == 'Site') {
        this._GiohangService.DonHangAdmin(this.Donhang).then(() => {
          this._snackBar.open('Áp Dụng Mã Khuyến Mãi', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
        })
      }
      else {
        this._GiohangService.DonHangAdmin(this.Donhang).then(() => {
          this._snackBar.open('Áp Dụng Mã Khuyến Mãi', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
        })
      }

    }
    else {
      delete this.Donhang.Khuyenmai
      this.Donhang.Giamgia = 0
      this.Donhang.Code = ''
      if (this.Role == 'Site') {
        this._GiohangService.DonHangAdmin(this.Donhang).then(() => {
          this._snackBar.open('Mã Khuyến Mãi Không Đúng', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-warning'],
          });
        })
      }
      else {
        this._GiohangService.DonHangAdmin(this.Donhang).then(() => {
          this._snackBar.open('Mã Khuyến Mãi Không Đúng', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-warning'],
          });
        })
      }
    }
  }
}
