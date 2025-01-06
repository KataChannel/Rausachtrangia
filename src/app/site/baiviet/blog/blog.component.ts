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
import { SlideSanphamComponent } from '../../../admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { DanhmucsanphamsiteComponent } from '../../../danhmucsanpham/danhmucsanphamsite/danhmucsanphamsite.component';
import { BreadcrumbadminComponent } from '../../../breadcrumb/breadcrumbadmin/breadcrumbadmin.component';
import { S } from '@angular/cdk/keycodes';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-baiviet-style1',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatBottomSheetModule,
    DatePipe,
    SlideSanphamComponent,
    DanhmucsanphamsiteComponent,
    BreadcrumbadminComponent
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  ListBaiviet: any = {}
  FilterBaiviet: any[] = []
  FilterBaivietKhac: any[] = []
  Danhmucs: any[] = []
  Detail: any = {}
  SearchParams: any = {
    pageSize: 999,
    pageNumber: 0,
    Status:1
  };
  Sorting: any[] = [
    { id: 1, Title: "Mới Nhất" },
    { id: 2, Title: "Cũ Nhất" },
    { id: 3, Title: "Thịnh Hành" },
    { id: 4, Title: "Bán Chạy" },
    { id: 5, Title: "Đánh Giá Cao" },
  ]
  LocDanhmuc: any[] = [
    { id: 1, Title: "Đặc Sản Rau Rừng" },
    { id: 2, Title: "Trái Cây Các Loại" },
    { id: 3, Title: "Các Loại Nấm" },
  ]
  LocThuongHieu: any[] = [
    { id: 1, Title: "Rau Sạch Trần Gia" },
  ]
  type: any
  breadcrumb: any[] = []
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _Title: Title,
    private route: ActivatedRoute) {
    this.type = this.route.snapshot.data['type'];
  }
  Breadcrumb: any = []
  openBottomSheet(): void {
    this._bottomSheet.open(BaivietBottomsheetComponent);
  }
  async ngOnInit() {
    const SlugDM = this.route.snapshot.params['danhmuc'];
    if(SlugDM)
      {
        if (this.type) { this.SearchParams.Type = this.type }   
        this.Detail = (await this._DanhmucService.SearchDanhmuc({ Slug: SlugDM })).items[0]
        this.SearchParams.idDM = this.Detail.id
        this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)        
        this.FilterBaiviet = this.ListBaiviet.items
        this.Danhmucs = await this._DanhmucService.getAllDanhmuc()
        this._Title.setTitle(this.Detail.Title)
        const breadcrumb = this.route.snapshot.data['breadcrumb'];
        if (breadcrumb) {
          this.breadcrumb = breadcrumb
        }
        else {
          this.breadcrumb = [
            { title: 'Trang Chủ', Slug: '/' },
            { title: this.Detail.Title, Slug: this.Detail.Slug }
          ]
        }
       this.FilterBaivietKhac = this.ListBaiviet.items
      }
  }
  // async applyFilter(event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   if (value.length > 1) {
  //     this.SearchParams.Query = value
  //     this.FilterBaiviet = this.ListBaiviet = (await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams))?.items
  //   }
  //   else {
  //     delete this.SearchParams.Query
  //     this.FilterBaiviet = this.ListBaiviet = (await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams))?.items
  //   }
  // }
}
