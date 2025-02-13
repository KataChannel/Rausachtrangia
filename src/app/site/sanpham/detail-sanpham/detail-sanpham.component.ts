import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from '../../../admin/main-admin/sanpham/sanpham.service';
import { GiohangService } from '../../../admin/main-admin/website/giohang/giohang.service';
import { SlideSanphamComponent } from '../../../admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { ImageModule } from 'primeng/image';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ListNotifyType } from '../../../shared/shared.utils';
import { TonkhoAdminService } from '../../../admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DanhmucsanphamsiteComponent } from '../../../danhmucsanpham/danhmucsanphamsite/danhmucsanphamsite.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BreadcrumbadminComponent } from '../../../breadcrumb/breadcrumbadmin/breadcrumbadmin.component';
import { TabViewModule } from 'primeng/tabview';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { DonhangsService } from '../../../admin/donhang/listdonhang/listdonhang.service';
Swiper.use([Navigation, Pagination, Autoplay]); // Khai báo các module đã import
@Component({
  selector: 'app-detail-sanpham',
  standalone:true,
  imports:[
    DecimalPipe,
    SlideSanphamComponent,
    ImageModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    DanhmucsanphamsiteComponent,
    SlideSanphamComponent,
    BreadcrumbadminComponent,
    TabViewModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detail-sanpham.component.html',
  styleUrls: ['./detail-sanpham.component.css']
})
export class DetailSanphamComponent implements OnInit {
  responsiveOptions: any[] = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  _SanphamService: SanphamService = inject(SanphamService);
  // _GiohangService: GiohangService = inject(GiohangService);
  _DonhangsService: DonhangsService = inject(DonhangsService);
  _TonkhoAdminService: TonkhoAdminService = inject(TonkhoAdminService);
  route: ActivatedRoute = inject(ActivatedRoute);
  breadcrumb: any[] = []
  Detail:any
  Tonkho:any
  Notify:any
  Loadmore:boolean=false
  Giachon:any={}
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  Slug:any
  Soluong:any=1
  ListNotifyType:any=ListNotifyType
  SelectImage:any='assets/images/noimage.png'
  constructor(
    private _snackBar: MatSnackBar,
    private dialog:MatDialog,
    private sanitizer: DomSanitizer
    ) { 
    this.Slug = this.route.snapshot.params['slug'];

  }

  async ngOnInit() {
    if(this.Slug)
    {
     this._SanphamService.getSanphamBySlug(this.Slug)
     this._SanphamService.sanpham$.subscribe(async (data)=>{
      if(data){ 
        this.Detail = data
        this.Giachon = this.Detail.Bienthe[0]
        this.Tonkho =  await this._TonkhoAdminService.getTonkhoByidSP(this.Detail.id)
        console.log(data);
        
        const breadcrumb = this.route.snapshot.data['breadcrumb'];
        if (breadcrumb) {
          this.breadcrumb = breadcrumb
        }
        else {
          this.breadcrumb = [
            { title: 'Trang Chủ', Slug: '/' },
            { title: data.Danhmuc.Title, Slug:'/danh-muc/'+data.Danhmuc.Slug },
            { title: data.Title, Slug: data.Slug }
          ]
        }


      }
     })    
    }
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  GetListImages(data:any)
  {
    console.log(Object.entries(data));
    return Object.entries(data)
  }
  AddtoCart(data:any)
  {
    console.log(data);
    // let item:any={}
    // item = data
    // item.Giachon = this.Giachon
    // item.Giachon.SLTT = (Number(this.Soluong)*Number(this.Giachon.khoiluong)).toFixed(2)
    // item.Soluong=this.Soluong   

    let item:any={}
    item = this.Giachon
    item.Soluong=this.Soluong   
    item.Title = data.Title
    item.Image = data?.Image?.Hinhchinh?.src
    console.log(item);
    
    this._DonhangsService.addToCart(item)
      this._snackBar.open("Thêm Vào Giỏ Hàng Thành Công","", {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
        duration: 1000,
      }); 
  }
  GiamSoluong()
  {
    return this.Soluong>1?this.Soluong--:1
  }
  TangSoluong()
  {
    return this.Soluong>1?this.Soluong--:1
  }
  // ngAfterViewInit(): void {
  //   const swiper = new Swiper('.mySwiper', {
  //     modules: [Pagination],
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable:true
  //     },
  //     navigation:true,
  //     slidesPerView:1,
  //     spaceBetween: 0,
  //     breakpoints: {
  //       640: {
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //       768: {
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //       1024: {
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //     },
  //   });
  // }
  ZoomImage(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
