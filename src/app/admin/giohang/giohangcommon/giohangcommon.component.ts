import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListGiohang } from '../listgiohang/listgiohang';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SanphamService } from '../../../sanpham/sanpham.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../users/auth/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-giohangcommon',
  imports: [
   MatFormFieldModule, 
   MatInputModule, 
   MatTableModule, 
   MatSortModule, 
   MatPaginatorModule,
   MatMenuModule,
   MatIconModule,
   MatButtonModule,
   FormsModule,
   MatDialogModule,
   CommonModule,
   MatProgressSpinnerModule
  ],
  templateUrl: './giohangcommon.component.html',
  styleUrl: './giohangcommon.component.scss'
})
export class GiohangcommonComponent implements OnInit {
  @Input() Donhang:any={Giohangs:[]}
  @Input() isEdit:boolean=false
  @Input() isAdmin:boolean=false
  @Output() TongcongEmit = new EventEmitter();
  @Output() GiohangsEmit = new EventEmitter();
  Sanphams:any[]=[]
  FilterSanphams:any[]=[]
  dataSource!: MatTableDataSource<any>;
  dialogRef:any;
  displayedColumns: string[] = [
      'STT',
      'Image', 
      'MaSP', 
      'Title',
      'Soluong', 
      'Tongtien', 
      'SLTG', 
      'TongtienG', 
      'SLTN', 
      'TongtienN', 
    ];
  ColumnName:any={
      'STT':'STT',
      'Image':'Hình Ảnh', 
      'MaSP':'Mã Sản Phẩm', 
      'Title':'Tên Sản Phẩm', 
      'Soluong':'Số Lượng',
      'Tongtien':'Tổng Tiền', 
      'SLTG':'SL Giao', 
      'TongtienG':'TT Giao', 
      'SLTN':'SL Nhận', 
      'TongtienN':'TT Nhận', 
    }
  @ViewChild('ChonSanphamDialog') ChonSanphamDialog!: TemplateRef<any>;
      _SanphamService:SanphamService = inject(SanphamService)
      _UsersService:UsersService = inject(UsersService)
    constructor(
      private dialog:MatDialog,
      private _snackBar:MatSnackBar  
    ) {}
    async ngOnInit() {
      console.log(this.Donhang);
      

      if(!this.isAdmin)
      {
        this.displayedColumns = [
          'STT',
          'Image', 
          'MaSP', 
          'Title',
          'Soluong', 
          'Tongtien',  
        ];
        this.ColumnName={
          'STT':'STT',
          'Image':'Hình Ảnh', 
          'MaSP':'Mã Sản Phẩm', 
          'Title':'Tên Sản Phẩm', 
          'Soluong':'Số Lượng',
          'Tongtien':'Tổng Tiền', 
        }
      }    
      this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
        await this._SanphamService.getAllSanpham()
         this._SanphamService.sanphams$.subscribe((data:any)=>{
          if(data){
          // data.forEach((item: any) => {
          //   item.GiaCoSo = parseFloat(item.GiaCoSo) || 0;
          //   if (item.Giagoc && Array.isArray(item.Giagoc)) {
          //     item.Giagoc.forEach((nestedItem: any) => {
          //       nestedItem.khoiluong = parseFloat(nestedItem.khoiluong) || 0;
          //       nestedItem.gia = parseFloat(nestedItem.gia) || 0;
          //       nestedItem.GiaCoSo = parseFloat(nestedItem.GiaCoSo) || 0;
          //     });
          //   }
          //   console.log(item);  
          //   this._SanphamService.UpdateSanpham(item).then((data:any)=>{if(data){console.log(data);}}) 
          // });
          this.FilterSanphams = this.Sanphams = data.filter((v1:any)=>v1.Status==1).map((v:any)=>({
          id: v.id,
          id_cat: v.id_cat,
          Title: v.Title,
          Danhmuc: v.Danhmuc,
          Slug: v.Slug,
          Giachon: v.Giachon,
          Giagoc: v.Giagoc,
          Image: v.Image,
          Soluong: v.Soluong,
        }))
      }})   
      }
     ngAfterViewInit() {} 
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
 
      }
      onValueChange(value:any,idx:any,fieldSL:any)
      {
        const input = value.target as HTMLInputElement;
        if(Number(input.value)<1)
          {
            this.Donhang.Giohangs[idx].Soluong = 1
            this._snackBar.open(`${fieldSL} Phải Từ 1 Trở Lên`, '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-error'],
            });
            console.log(this.Donhang.Giohangs[idx].Soluong);
            
          }
          else {
            this.Donhang.Giohangs[idx].Soluong=Number(input.value)
            this.Donhang.Giohangs[idx].Tongtien = Number(input.value)*this.Donhang.Giohangs[idx].GiaCoSo
          }
          this.GiohangsEmit.emit(this.Donhang.Giohangs)
      }
      ChangeSoluong(idx:any,method:any,fieldTong:any,fieldSL:any){
        this.Donhang.Giohangs[idx][fieldSL]=Number(this.Donhang.Giohangs[idx][fieldSL])||0
        if (this.Donhang.Giohangs[idx][fieldSL] <= 1 && method === 'giam') {
          this._snackBar.open(`${fieldSL} phải từ 1 trở lên`, '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.Donhang.Giohangs[idx][fieldSL] = 1;
        }
        else {
          if(method=='giam'){
            this.Donhang.Giohangs[idx][fieldSL]--
            this.Donhang.Giohangs[idx][fieldTong] = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
          }
          else {
            this.Donhang.Giohangs[idx][fieldSL]++
            this.Donhang.Giohangs[idx][fieldTong] = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
          }
        }
        console.log(this.Donhang.Giohangs);
        this.GiohangsEmit.emit(this.Donhang.Giohangs)
      }
      AddSanpham()
      {
        this.dialogRef = this.dialog.open(this.ChonSanphamDialog);
        this.dialogRef.afterClosed().subscribe((result:any) => {
          if (result == 'true') {
            // this.Detail.Giohangs.Sanpham.push(this.Sanpham)
            this._snackBar.open('Thêm Thành Công', '', {
              duration: 1000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }
        }); 
      }
      DoSearchSanpham(event: Event)
      {
        const filterValue = (event.target as HTMLInputElement).value;
        this.FilterSanphams = this.Sanphams.filter((v)=>v.Title.toLowerCase().includes(filterValue.toLowerCase()))
        console.log(this.FilterSanphams);     
      }
      Chonsanpham(data:any,giagoc:any)
      {
        console.log(data);     
          let item:any={}
          item = giagoc
          if(item.MaSP=='-1')
            {
              this._snackBar.open('Lỗi Sản Phẩm', '', {
                duration: 1000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['snackbar-error'],
              });
            }
       else {
          item.Soluong=1
          item.Title = data.Title
          item.Image = data?.Image?.Hinhchinh?.src
          const existingItemIndex =  this.Donhang.Giohangs?.findIndex((v: any) => v.MaSP === data.MaSP);
          if (existingItemIndex !== -1) {
                 this.Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
                 this.Donhang.Giohangs[existingItemIndex].SLTT += Number(item.Soluong) * parseFloat(Number(item.khoiluong).toFixed(2));
                 this.Donhang.Giohangs[existingItemIndex].Tongtien = this.Donhang.Giohangs[existingItemIndex].SLTT*this.Donhang.Giohangs[existingItemIndex].GiaCoSo
           } else {
                 item.SLTT = Number(item.khoiluong)
                 item.Tongtien = item.SLTT*item.GiaCoSo
                 item.SLTG = 0
                 item.TongtienG = 0
                 item.SLTN = 0
                 item.TongtienN = 0
                 this.Donhang.Giohangs.push(item);
           }
          console.log(item);
        
          console.log(this.Donhang.Giohangs);
          this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
          this.GiohangsEmit.emit(this.Donhang.Giohangs)
          this.dialogRef.close()
        } 


      }
      Xoasanpham(item:any){
        console.log(item);
        this.Donhang.Giohangs = this.Donhang.Giohangs.filter((v:any)=>v.MaSP!=item.MaSP)
        this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
        this.GiohangsEmit.emit(this.Donhang.Giohangs)
      }
      Xoagiohang(){ 
        this.Donhang.Giohangs = []
        this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
        this.GiohangsEmit.emit(this.Donhang.Giohangs)
      }
      TinhTong(items:any,fieldTong:any){  
        const subtotal = items?.reduce((sum:any, item:any) => sum + (item['Tongtien'] || 0), 0) || 0;
        const shippingFee = this.Donhang?.Vanchuyen?.Phivanchuyen || 0;
        const discount = this.Donhang?.Khuyenmai?.value || 0;
        const tax = this.Donhang?.Thue || 0;
        const grandTotal = subtotal + shippingFee + discount + tax;
        this.TongcongEmit.emit({Tongcong:grandTotal,Tong:subtotal})
        return items?.reduce((sum:any, item:any) => sum + item[fieldTong], 0);
      }
    }
