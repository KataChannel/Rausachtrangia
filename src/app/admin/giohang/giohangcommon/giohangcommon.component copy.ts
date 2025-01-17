import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Input, Output, signal, TemplateRef, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './giohangcommon.component.html',
  styleUrl: './giohangcommon.component.scss'
})
export class GiohangcommonComponent {
  @Input() Giohangs:any[]=[]
  @Input() Donhang:any={}
  @Input() isEdit:boolean=false
  @Input() isAdmin:boolean=false
  @Output() TongcongEmit = new EventEmitter();
  @Output() GiohangsEmit = new EventEmitter();
  Sanphams:any[]=[]
  FilterSanphams:any[]=[]
  dataSource!: MatTableDataSource<any>;
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
    Profile = signal<any>({});
    constructor(
      private dialog:MatDialog,
      private _snackBar:MatSnackBar  
    ) {}
    async ngOnInit(): Promise<void> {
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
        await this._UsersService.getProfile()       
        this.dataSource = new MatTableDataSource(this.Giohangs); 
        await this._SanphamService.getAllSanpham()
         this._SanphamService.sanphams$.subscribe((data:any)=>{if(data){
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
          this.FilterSanphams = this.Sanphams = data.map((v:any)=>({
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
            this.Giohangs[idx].Soluong = 1
            this._snackBar.open(`${fieldSL} Phải Từ 1 Trở Lên`, '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-error'],
            });
            console.log(this.Giohangs[idx].Soluong);
            
          }
          else {
            this.Giohangs[idx].Soluong=Number(input.value)
            this.Giohangs[idx].Tongtien = Number(input.value)*this.Giohangs[idx].GiaCoSo
          }
          this.GiohangsEmit.emit(this.Giohangs)
      }
      ChangeSoluong(idx:any,method:any,fieldTong:any,fieldSL:any){
        this.Giohangs[idx][fieldSL]=Number(this.Giohangs[idx][fieldSL])||0
        if (this.Giohangs[idx][fieldSL] <= 1 && method === 'giam') {
          this._snackBar.open(`${fieldSL} phải từ 1 trở lên`, '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.Giohangs[idx][fieldSL] = 1;
        }
        else {
          if(method=='giam'){
            this.Giohangs[idx][fieldSL]--
            this.Giohangs[idx][fieldTong] = this.Giohangs[idx][fieldSL]*this.Giohangs[idx].GiaCoSo
          }
          else {
            this.Giohangs[idx][fieldSL]++
            this.Giohangs[idx][fieldTong] = this.Giohangs[idx][fieldSL]*this.Giohangs[idx].GiaCoSo
          }
        }
        console.log(this.Giohangs);
        this.GiohangsEmit.emit(this.Giohangs)
      }
      AddSanpham()
      {
        const dialogRef = this.dialog.open(this.ChonSanphamDialog);
        dialogRef.afterClosed().subscribe((result) => {
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
        console.log(giagoc);     
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
          const existingItemIndex =  this.Giohangs?.findIndex((v: any) => v.MaSP === data.MaSP);
          if (existingItemIndex !== -1) {
                 this.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
                 this.Giohangs[existingItemIndex].SLTT += Number(item.Soluong) * parseFloat(Number(item.khoiluong).toFixed(2));
                 this.Giohangs[existingItemIndex].Tongtien = this.Giohangs[existingItemIndex].SLTT*this.Giohangs[existingItemIndex].GiaCoSo
           } else {
                 item.SLTT = Number(item.khoiluong)
                 item.Tongtien = item.SLTT*item.GiaCoSo
                 item.SLTG = 0
                 item.TongtienG = 0
                 item.SLTN = 0
                 item.TongtienN = 0
                 this.Giohangs.push(item);
           }
          console.log(item);
        
          console.log(this.Giohangs);
          this.dataSource = new MatTableDataSource(this.Giohangs); 
            this.GiohangsEmit.emit(this.Giohangs)
          this.dialog.closeAll()
        } 


      }
      Xoasanpham(item:any){
        console.log(item);
        this.Giohangs = this.Giohangs.filter((v)=>v.MaSP!=item.MaSP)
        this.dataSource = new MatTableDataSource(this.Giohangs); 
        this.GiohangsEmit.emit(this.Giohangs)
      }
      Xoagiohang(){ 
        this.Giohangs = []
        this.dataSource = new MatTableDataSource(this.Giohangs); 
        this.GiohangsEmit.emit(this.Giohangs)
      }
      TinhTong(items:any,fieldTong:any){
        const Tong =items.reduce((sum:any, item:any) => sum + item[fieldTong], 0);
        const Tongcong = items.reduce((sum:any, item:any) => sum + item[fieldTong], 0)+
        (this.Donhang?.Vanchuyen?.Phivanchuyen||0)+
        (this.Donhang?.Khuyenmai?.value||0) +
        (this.Donhang?.Thue||0)
        this.TongcongEmit.emit({Tongcong:Tongcong,Tong:Tong})
        return items.reduce((sum:any, item:any) => sum + item[fieldTong], 0);
      }
    }
