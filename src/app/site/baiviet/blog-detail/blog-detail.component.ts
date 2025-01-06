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
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { BreadcrumbadminComponent } from '../../../breadcrumb/breadcrumbadmin/breadcrumbadmin.component';
@Component({
  selector: 'app-baiviet-style1',
  standalone: true,
  imports: [
    MatButtonModule,
    MatBottomSheetModule,
    SlideSanphamComponent,
    DanhmucsanphamsiteComponent,
    BreadcrumbadminComponent
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  ListBaiviet: any = {}
  FilterBaiviet: any[] = []
  FilterBaivietKhac: any[] = []
  //Danhmucs: any[] = []
  SearchParams: any = {
    pageSize: 50,
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
  Detail: any = {}
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    private _bottomSheet: MatBottomSheet,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private _Title: Title,
  ) {
    this.meta.removeTag('name="author"');
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('name="abstract"');
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BaivietBottomsheetComponent);
  }
  breadcrumb: any[] = []
  async ngOnInit() {
    const Slug = this.route.snapshot.params['slug'];
    const SlugDM = this.route.snapshot.params['danhmuc'];
    const Danhmuc = (await this._DanhmucService.SearchDanhmuc({ Slug: SlugDM })).items[0]
    this.SearchParams.idDM = Danhmuc.id
    this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
    //this.Danhmucs = await this._DanhmucService.getAllDanhmuc()  
    this.FilterBaiviet = this.ListBaiviet.items
    console.log(this.FilterBaiviet);
    
    this.FilterBaivietKhac = this.ListBaiviet.items.splice(0, 8)
    if (Slug) {
      this.Detail = await this._BaivietAdminService.getBaivietBySlug(Slug)
      this._Title.setTitle(this.Detail.Title)
      const breadcrumb = this.route.snapshot.data['breadcrumb'];
      if (breadcrumb) {
        this.breadcrumb = breadcrumb
      }
      else {
        this.breadcrumb = [
          { title: 'Trang Chủ', Slug: '/' },
          { title: Danhmuc.Title, Slug: '/blog/' + Danhmuc.Slug },
          { title: this.Detail.Title, Slug: this.Detail.Slug }
        ]
      }

      // this.meta.updateTag({ name: 'author', content: this.Detail.MetaTags.author });
      // this.meta.updateTag({ name: 'description', content: this.Detail.MetaTags.description });
      // this.meta.updateTag({ name: 'keywords', content: this.Detail.MetaTags.keywords });
      // this.meta.updateTag({ name: 'abstract', content: this.Detail.MetaTags.abstract });
      // this.meta.updateTag({ name: 'title', content: this.Detail.title });
      // this.title.setTitle(this.Detail.title);
      console.log(this.meta);
    }

  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  async applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.SearchParams.Query = value
      this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
      this.FilterBaiviet = this.ListBaiviet.items
    }
    else {
      delete this.SearchParams.Query
      this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
      this.FilterBaiviet = this.ListBaiviet.items
    }
  }
}
