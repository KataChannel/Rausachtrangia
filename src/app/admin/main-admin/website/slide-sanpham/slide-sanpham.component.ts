import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { GiohangService } from '../giohang/giohang.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SanphamblockComponent } from '../../../../sanpham/sanphamblock/sanphamblock.component';

@Component({
  selector: 'app-slide-sanpham',
  standalone:true,
  imports:[
    DecimalPipe,
    MatButtonModule,
    SanphamblockComponent,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-sanpham.component.html',
  styleUrls: ['./slide-sanpham.component.css']
})
export class SlideSanphamComponent implements OnInit {
  @Input() Title:any='';
  @Input() Sohang=1;
  @Input() Socot=4;
  @Input() Soluong=8;
  @Input() Filter='';
  @Input() idDM=0;
  @Input() Danhmuc:any={};
  @Input() Type='NGANG';
  @Input() Ordering=0;
  _SanphamService:SanphamService = inject(SanphamService)
  _GiohangService: GiohangService = inject(GiohangService);
  Lists: any={}
  FilterLists: any[] = []
  FilterListsDesk: any[] = []
  SearchParams: any = {
    pageSize:8,
    pageNumber:0,
    Status:1
  };
  constructor(
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) { }

  async ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe(async (breakpoints:any) => {
      // console.log(breakpoints.matches);
      if (breakpoints.matches) {
        this.Sohang = 2
        this.SearchParams.Filter = this.Filter    
        if(this.Danhmuc.hasOwnProperty('id')){ this.SearchParams.idDM = this.Danhmuc.id}
       if(this.Type=='DOC')
       {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.Lists.items
       }
       else if(this.Soluong==999)
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,4)
         // console.log(this.FilterLists);
        }
        else 
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang).slice(0,8)  
         // console.log(this.FilterLists);
         
        }
      } else {
        this.Sohang = 1
        this.SearchParams.Filter = this.Filter    
        if(this.Danhmuc.hasOwnProperty('id')){ this.SearchParams.idDM = this.Danhmuc.id}
       if(this.Type=='DOC')
       {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.Lists.items
       }
       else if(this.Soluong==999)
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,4)
         // console.log(this.FilterLists);
        }
        else 
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang).slice(0,8)  
         // console.log(this.FilterLists);
         
        }
      }
    });
  }
  SanphamColumn(data:any,n:any)
  {
    const chunkSize = n; // Number of elements per subarray
    const newArray = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      newArray.push(data.slice(i, i + chunkSize));
    }
    return newArray
  }
  LitmitSanpham(items:any,soluong:any)
  {
    return items?.slice(0,soluong)   
  }
  AddtoCart(data:any)
  { 
    let item:any={}
    item = data
    item.Giachon = data.Giagoc[0]
    item.Giachon.SLTT = data.Giagoc[0].khoiluong
    item.Soluong=1    
    this._GiohangService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
  ngAfterViewInit(): void {
    // const swiper = new Swiper('.mySwiper', {
    //   modules: [Pagination],
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable:true
    //   },
    //   navigation:true,
    //   slidesPerView:1,
    //   spaceBetween: 20,
    //   speed:1000,
    //   autoplay:{
    //     delay:100
    //   },
    //   breakpoints: {
    //     640: {
    //       slidesPerView: 1,
    //       spaceBetween: 20,
    //     },
    //     768: {
    //       slidesPerView: 1,
    //       spaceBetween: 40,
    //     },
    //     1024: {
    //       slidesPerView: 1,
    //       spaceBetween: 50,
    //     },
    //   },
    // });
  }
}
