import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { BaivietBottomsheetComponent } from '../baiviet-bottomsheet/baiviet-bottomsheet.component';
import { BaivietAdminService } from '../../../admin/main-admin/baiviet-admin/baiviet-admin.service';
import { DanhmucService } from '../../../admin/main-admin/danhmuc/danhmuc.service';
@Component({
  selector: 'app-gioithieuchung',
  standalone:true,
  imports:[
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatBottomSheetModule,
    DatePipe
  ],
  templateUrl: './gioithieuchung.component.html',
  styleUrls: ['./gioithieuchung.component.css']
})
export class GioithieuchungComponent implements OnInit {
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService);
  Detail:any={}
  Slug:any
  constructor(
    private _bottomSheet: MatBottomSheet,
    private route: ActivatedRoute) {
    this.Slug = this.route.snapshot.data['slug'];
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BaivietBottomsheetComponent);
  }
  async ngOnInit() {
    if(this.Slug)
    {
      console.log(this.Slug);
      this.Detail = await this._BaivietAdminService.getBaivietBySlug(this.Slug)
      console.log(this.Detail);
    }
  }
}
