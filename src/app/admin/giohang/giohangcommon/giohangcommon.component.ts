import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
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
   CommonModule
  ],
  templateUrl: './giohangcommon.component.html',
  styleUrl: './giohangcommon.component.scss'
})
export class GiohangcommonComponent {
  @Input() Giohangs:any[]=[]
  @Input() Donhang:any={}
  @Output() TongcongEmit = new EventEmitter();
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
    ];
    ColumnName:any={
      'STT':'STT',
      'Image':'Hình Ảnh', 
      'MaSP':'Mã Sản Phẩm', 
      'Title':'Tên Sản Phẩm', 
      'Soluong':'Số Lượng', 
      'Tongtien':'Tổng Tiền', 
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('ChonSanphamDialog') ChonSanphamDialog!: TemplateRef<any>;
      _SanphamService:SanphamService = inject(SanphamService)
    constructor(
      private dialog:MatDialog,
      private _snackBar:MatSnackBar  
    ) {}
    async ngOnInit(): Promise<void> {
      console.log(this.Giohangs);
      
      this.Giohangs = this.Giohangs.map((v)=>({
        Image:v.Image,
        MaSP:v.MaSP,
        Title:`${v.Title} (${v.khoiluong}${v.dvt})`,
        Soluong:v.Soluong,
        GiaCoSo:v.GiaCoSo,
        Tongtien: v.SLTT*v.GiaCoSo
       }))
        this.dataSource = new MatTableDataSource(this.Giohangs); 
        this.dataSource.paginator = this.paginator; 
        await this._SanphamService.getAllSanpham()
         this._SanphamService.sanphams$.subscribe((data:any)=>{if(data){
          this.FilterSanphams = this.Sanphams=data.map((v:any)=>({
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
     ngAfterViewInit() { 
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
        this.paginator._intl.nextPageLabel = 'Tiếp Theo';
        this.paginator._intl.previousPageLabel = 'Về Trước';
        this.paginator._intl.firstPageLabel = 'Trang Đầu';
        this.paginator._intl.lastPageLabel = 'Trang Cuối';
        this.paginator.pageSize = 30
      } 
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
      onValueChange(value:any,idx:any)
      {
        const input = value.target as HTMLInputElement;
        if(Number(input.value)<1)
          {
            this.Giohangs[idx].Soluong = 1
            this._snackBar.open('Số Lượng Phải Từ 1 Trở Lên', '', {
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
      }
      ChangeSoluong(idx:any,method:any){
        if (this.Giohangs[idx].Soluong <= 1 && method === 'giam') {
          this._snackBar.open('Số lượng phải từ 1 trở lên', '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.Giohangs[idx].Soluong = 1;
        }
        else {
          if(method=='giam'){
            this.Giohangs[idx].Soluong--
            this.Giohangs[idx].Tongtien = this.Giohangs[idx].Soluong*this.Giohangs[idx].GiaCoSo
          }
          else {
            this.Giohangs[idx].Soluong++
            this.Giohangs[idx].Tongtien = this.Giohangs[idx].Soluong*this.Giohangs[idx].GiaCoSo
          }

        }

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
      Chonsanpham(item:any)
      {
        // this.Sanpham.Giachon = item
        // this.Sanpham.Giachon.SLTT = Number(item.khoiluong)
        // this.Sanpham.Soluong =  1
      }
      TinhTong(items:any){
        const Tong =items.reduce((sum:any, item:any) => sum + item.Tongtien, 0);
        const Tongcong = items.reduce((sum:any, item:any) => sum + item.Tongtien, 0)+
        (this.Donhang?.Vanchuyen?.Phivanchuyen||0)+
        (this.Donhang?.Khuyenmai?.value||0) +
        (this.Donhang?.Thue||0)
        this.TongcongEmit.emit({Tongcong:Tongcong,Tong:Tong})
        return items.reduce((sum:any, item:any) => sum + item.Tongtien, 0);
      }
    }
