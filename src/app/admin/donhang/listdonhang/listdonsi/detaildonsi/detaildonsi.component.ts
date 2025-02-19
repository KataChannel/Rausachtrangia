import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BanggiasService } from '../../../../banggia/listbanggia/listbanggia.service';
import { SanphamsService } from '../../../../sanpham/listsanpham/listsanpham.service';
import { ListdonhangComponent } from '../../listdonhang.component';
import { DonhangsService } from '../../listdonhang.service';
import { GiohangcommonComponent } from '../../../../giohang/giohangcommon/giohangcommon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KhachhangsService } from '../../../../khachhang/listkhachhang/listkhachhang.service';
import html2canvas from 'html2canvas';
import moment from 'moment';

@Component({
  selector: 'app-detaildonsi',
  imports: [
   MatFormFieldModule,
   MatInputModule,
   FormsModule,
   MatIconModule,
   MatButtonModule,
   MatSelectModule,
   MatTableModule,
   MatPaginatorModule,
   MatSortModule,
   FormsModule,
   MatDatepickerModule,
   CommonModule,
   GiohangcommonComponent,
   MatProgressSpinnerModule
  ],
  templateUrl: './detaildonsi.component.html',
  styleUrl: './detaildonsi.component.scss'
})
export class DetaildonsiComponent {
    _ListdonhangComponent:ListdonhangComponent = inject(ListdonhangComponent)
    _DonhangsService:DonhangsService = inject(DonhangsService)
    _SanphamsService:SanphamsService = inject(SanphamsService)
    _KhachhangsService:KhachhangsService = inject(KhachhangsService)
    _BanggiasService:BanggiasService = inject(BanggiasService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar: MatSnackBar = inject(MatSnackBar)
    constructor() {}
    Detail:any={Giohangs:[],Ngaygiao:moment().add(1, 'days').format('YYYY-MM-DD')}
    isEdit:boolean=false
    isDelete:boolean=false
    paramId:any
    ListSanpham:any[]=[]
    ListKhachhang:any[]=[]
    FilterKhachhang:any[]=[]
    ListBanggia:any[]=[]
    FilterBanggia:any[]=[]
    Ngayin:any = new Date()
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.paramId = data.get('id')
        if(this.paramId){
          this._KhachhangsService.getAllKhachhang().then((data:any)=>{
            this.ListKhachhang = this.FilterKhachhang =data
          })
          this._BanggiasService.getAllBanggia().then((data:any)=>{
            this.ListBanggia = this.FilterBanggia =data
          })        
          if(this.paramId === '0') {
            this.isEdit = this.paramId === '0'; 
            this._ListdonhangComponent.drawer.open();   
          }
          else {
            this._DonhangsService.getDonhangByid(this.paramId).then((data:any)=>{
              if(data){
                this.Detail = data  
                this.UpdateListSanpham()
                this._ListdonhangComponent.drawer.open();   
              }
            })  
          }
        }  
        else {
          this._ListdonhangComponent.drawer.close();   
        }
      });   
    }
    NgaygiaoFilter = (d: Date | null): boolean => {
      const today = new Date();
      today.setDate(today.getDate());
      return d ? d > today : false;
    };
    Tongcong:any=0
    Tong:any=0
    Tinhtongcong(value:any){      
      this.Tongcong = value.Tongcong
      this.Tong = value.Tong
    }
    GetGiohangsEmit(value:any){ 
      this.Detail.Giohangs = value
     // this._DonhangsService.updateOneDonhang(this.Detail)
    }
    DoFindKhachhang(event:any){
      const query = event.target.value.toLowerCase();
       this.FilterKhachhang = this.ListKhachhang.filter(v => v.TenKH.toLowerCase().includes(query));      
    }
    SelectKhachhang(event:any){     
      const selectedKhachhang = this.ListKhachhang.find(v => v.id === event.value);      
      if (selectedKhachhang) {
        this.Detail.Khachhang = {
          ...this.Detail.Khachhang,
          TenKH: selectedKhachhang.TenKH,
          SDT: selectedKhachhang.SDT,
          Diachi: selectedKhachhang.Diachi,
          Ghichu: selectedKhachhang.Ghichu,
        };
        this.Detail.idBanggia = selectedKhachhang.idBanggia
      }
    }

    DoFindBanggia(event:any){
      const query = event.target.value.toLowerCase();
       this.FilterBanggia = this.ListBanggia.filter(v => v.Title.toLowerCase().includes(query));      
    }
   async UpdateListSanpham() {
     await this._SanphamsService.getAllSanpham().then((data: any) => {
        console.log(data);
      this.ListSanpham = data.filter((v: any) => v.Status === 1).map((v: any) => ({
        id: v.id,
        Title: v.Title,
        Slug: v.Slug,
        MaSP: v.MaSP,
        giagoc: Number(v.giagoc),
        dvt: v.dvt,
        Image: v.Image,
        Soluong: 1,
        }));
      });    
      console.log(this.ListSanpham);
   
      const Banggia = this.ListBanggia.find((v) => v.id === this.Detail.idBanggia);
      console.log(this.Detail);
      
      if (Banggia) {
      this.ListSanpham.forEach((v: any) => {
        const Sanpham = Banggia.ListSP.find((sp: any) => sp.MaSP === v.MaSP);
        if (Sanpham) {
        v.giagoc = Number(Sanpham.giaban);
        }       
      });
      } else {
      this.ListSanpham.forEach((v: any) => {
        v.giagoc = 0;
      });
      }
      console.log(Banggia);
      console.log(this.ListSanpham);
    }
    UpdateBangia(){
      const Banggia = this.ListBanggia.find(v => v.id === this.Detail.idBanggia) 
      const valueMap = new Map(Banggia.ListSP.map(({ MaSP, giaban }:any) => [MaSP, giaban]));
      this.Detail.Giohangs = this.Detail.Giohangs
          .filter(({ MaSP }:any) => valueMap.has(MaSP)) // Chỉ giữ lại phần tử có trong data2
          .map((item:any) => ({
              ...item,  // Giữ lại tất cả các thuộc tính từ data1
              gia: valueMap.get(item.MaSP)?? item.gia, // Cập nhật giá trị value từ data2
              Tongtien: valueMap.get(item.MaSP)?? item.gia // Cập nhật giá trị value từ data2
          }));
          this.UpdateListSanpham()
      console.log(this.Detail.Giohangs);
    }
    SelectBanggia(event:any){
      console.log(event.value);  
      this.Detail.idBanggia = event.value
      this.UpdateBangia()
      // const Banggia = this.ListBanggia.find(v => v.id === event.value) 
      // const valueMap = new Map(Banggia.ListSP.map(({ id, giaban }:any) => [id, giaban]));
      // this.Detail.Giohangs = this.Detail.Giohangs
      //     .filter(({ id }:any) => valueMap.has(id)) // Chỉ giữ lại phần tử có trong data2
      //     .map((item:any) => ({
      //         ...item,  // Giữ lại tất cả các thuộc tính từ data1
      //         gia: valueMap.get(item.id)?? item.gia, // Cập nhật giá trị value từ data2
      //         Tongtien: valueMap.get(item.id)?? item.gia // Cập nhật giá trị value từ data2
      //     }));
      // console.log(this.Detail.Giohangs);
    }
    TinhTong(items:any,fieldTong:any){  
      return items?.reduce((sum:any, item:any) => sum + (item[fieldTong] || 0), 0) || 0;
    }
    printContent()
    {
      const element = document.getElementById('printContent');
      if (!element) return;
  
      html2canvas(element, { scale: 2 }).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
  
        // Mở cửa sổ mới và in ảnh
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
  
        printWindow.document.write(`
          <html>
            <head>
              <title>${this.Detail?.MaDonHang}</title>
            </head>
            <body style="text-align: center;">
              <img src="${imageData}" style="max-width: 100%;"/>
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() { window.close(); };
                };
              </script>
            </body>
          </html>
        `);
  
        printWindow.document.close();
      });
    }
    goBack(){
      // window.location.href=`/admin/donhang`;
      this._route.navigate(['admin/donhang']);
    }
    SaveData()
    {
      if(this.paramId=='0')
      {
        if(!this.Detail.idKH || this.Detail.idKH === '')
        {
          this._snackBar.open('Vui lòng chọn khách hàng', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-warning'],
          });
        }
        else {
          this._DonhangsService.createDonhang(this.Detail).then((data)=>
            {
              this._snackBar.open('Thêm Mới Thành Công', '', {
                duration: 1000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['snackbar-success'],
              });
              this._route.navigate(['admin/donhang/donsi', data.id])
            })
            this.isEdit=false 
        }
      }
      else
      {
        this._DonhangsService.updateOneDonhang(this.Detail).then((data:any)=>{
            this._snackBar.open('Cập Nhật Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
          })
          this.isEdit=false 
      } 
    }
    Coppy()
    {
      this._snackBar.open('Đang Coppy Đơn Hàng', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning'],
      });
        delete this.Detail.id
        this._DonhangsService.createDonhang(this.Detail).then((data:any)=>{
         setTimeout(() => {
          window.location.href = `admin/donhang/donsi/${data.id}`;
         }, 1000);
    
        })
    }
    DeleteData()
    {
      this._DonhangsService.DeleteDonhang(this.Detail).then((data:any)=>{
        if(data)
          this._snackBar.open('Xóa Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'], 
          });
        }) 
        // window.location.href=`/admin/donhang`;
    } 
}
