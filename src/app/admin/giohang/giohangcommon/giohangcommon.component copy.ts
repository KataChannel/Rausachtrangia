// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Component, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef, ViewChild } from '@angular/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { ListGiohang } from '../listgiohang/listgiohang';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import { FormsModule } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { SanphamService } from '../../../sanpham/sanpham.service';
// import { CommonModule } from '@angular/common';
// import { UsersService } from '../../users/auth/users.service';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import * as XLSX from 'xlsx';
// import { DonhangsService } from '../../donhang/listdonhang/listdonhang.service';
// import { ConvertDriveColumnName, ConvertDriveData } from '../../../shared/shared.utils';
// import moment from 'moment';
// @Component({
//   selector: 'app-giohangcommon',
//   imports: [
//    MatFormFieldModule, 
//    MatInputModule, 
//    MatTableModule, 
//    MatSortModule, 
//    MatPaginatorModule,
//    MatMenuModule,
//    MatIconModule,
//    MatButtonModule,
//    FormsModule,
//    MatDialogModule,
//    CommonModule,
//    MatProgressSpinnerModule
//   ],
//   templateUrl: './giohangcommon.component.html',
//   styleUrl: './giohangcommon.component.scss'
// })
// export class GiohangcommonComponent implements OnInit {
//   @Input() Donhang:any={Giohangs:[]}
//   @Input() isEdit:boolean=false
//   @Input() isAdmin:boolean=false
//   @Input() isShowCrease:boolean=true
//   @Input() Type:any='banle'
//   @Input() HideColumns:any[]=[]
//   @Output() TongcongEmit = new EventEmitter();
//   @Output() GiohangsEmit = new EventEmitter();
//   Sanphams:any[]=[]
//   FilterSanphams:any[]=[]
//   SanphamsBansi:any[]=[]
//   FilterSanphamsBansi:any[]=[]
//   dataSource!: MatTableDataSource<any>;
//   dialogRef:any;
//   displayedColumns: string[] = [
//       'STT',
//       'Image', 
//       'MaSP', 
//       'Title',
//       'dvt',
//       'Soluong', 
//       'Tongtien', 
//       'SLTG', 
//       'TongtienG', 
//       'SLTN', 
//       'TongtienN', 
//     ];
//   ColumnName:any={
//       'STT':'STT',
//       'Image':'Hình Ảnh', 
//       'MaSP':'Mã Sản Phẩm', 
//       'Title':'Tên Sản Phẩm', 
//       'dvt':'Đơn Vị Tính', 
//       'Soluong':'Số Lượng',
//       'Tongtien':'Tổng Tiền', 
//       'SLTG':'SL Giao', 
//       'TongtienG':'TT Giao', 
//       'SLTN':'SL Nhận', 
//       'TongtienN':'TT Nhận', 
//     }
//   @ViewChild('ChonSanphamDialog') ChonSanphamDialog!: TemplateRef<any>;
//   _SanphamService:SanphamService = inject(SanphamService)
//   _DonhangsService:DonhangsService = inject(DonhangsService)
//   _UsersService:UsersService = inject(UsersService)
//   @ViewChild(MatSort) sort!: MatSort;
//     constructor(
//       private dialog:MatDialog,
//       private _snackBar:MatSnackBar  
//     ) {}
//     async ngOnInit() {
//       this.displayedColumns = this.displayedColumns.filter(col => !this.HideColumns.includes(col));
//       this.ColumnName = Object.fromEntries(
//         Object.entries(this.ColumnName).filter(([key]) => !this.HideColumns.includes(key))
//       ); 
//      // console.log(ColumnName);

//       if(!this.isAdmin)
//       {
//         this.displayedColumns = [
//           'STT',
//           'Image', 
//           'MaSP', 
//           'Title',
//           'Soluong', 
//           'Tongtien',  
//         ];
//         this.ColumnName={
//           'STT':'STT',
//           'Image':'Hình Ảnh', 
//           'MaSP':'Mã Sản Phẩm', 
//           'Title':'Tên Sản Phẩm', 
//           'Soluong':'Số Lượng',
//           'Tongtien':'Tổng Tiền', 
//         }
//       }    
//       this.dataSource = new MatTableDataSource(this.Donhang.Giohangs);
//       this.dataSource.sort = this.sort;
//       if (this.sort) {
//         this.dataSource.sort = this.sort;
//         console.log(this.dataSource.sort);
        
//       }
//         await this._SanphamService.getAllSanpham()
//          this._SanphamService.sanphams$.subscribe((data:any)=>{
//           if(data){                       
//            this.FilterSanphams = this.Sanphams = data.filter((v1:any)=>v1.Status==1).map((v:any)=>({
//               id: v.id,
//               Title: v.Title,
//               Slug: v.Slug,
//               MaSP: v.MaSP,
//               giagoc: Number(v.giagoc),
//               dvt: v.dvt,
//               Image: v.Image,
//               Soluong: 1,
//             }))
//           }}) 
//           // this.FilterSanphams = this.Sanphams.filter(v => 
//           //   !this.Donhang.Giohangs.some((v1: any) => 
//           //       v1.MaSP === v.Giagoc.find((v2: any) => v2.khoiluong === 1)?.MaSP
//           //   )
//           //  );           
//            this.FilterSanphamsBansi = this.Sanphams.filter(v => 
//             !this.Donhang.Giohangs.some((v1: any) => v1.MaSP === v.MaSP)).map((v:any)=>({
//               id: v.id,
//               MaSP: v.MaSP,
//               giagoc: Number(v.giagoc),
//               dvt: v.dvt,
//               Soluong: 1,
//               Title: v.Title,
//               SLTT: Number(v.Soluong),
//               Tongtien: v.Soluong*Number(v.giagoc),
//               SLTG: 0,
//               TongtienG: 0,
//               SLTN: 0,
//               TongtienN: 0,
//               Ghichu: ''
//             }))  
//             console.log(this.FilterSanphamsBansi);
                       
//       }
//      ngAfterViewInit() {} 
//       applyFilter(event: Event) {
//         const filterValue = (event.target as HTMLInputElement).value;
//         this.dataSource.filter = filterValue.trim().toLowerCase();
 
//       }
//       onValueChange(value:any,idx:any,fieldSL:any,fieldTong:any)
//       {
//         const input = value.target as HTMLInputElement;

//         switch
//         if(fieldSL=='Soluong')
//         {
//           if(Number(input.value)<=0)
//             {
//               this.Donhang.Giohangs[idx].Soluong = this.Donhang.Giohangs[idx].SLTG = this.Donhang.Giohangs[idx].SLTN= 1
//               this._snackBar.open(`Giá trị phải lớn hơn 0`, '', {
//                 duration: 1000,
//                 horizontalPosition: "end",
//                 verticalPosition: "top",
//                 panelClass: ['snackbar-error'],
//               }); 
//             }
//             else {
//               this.Donhang.Giohangs[idx].Soluong = this.Donhang.Giohangs[idx].SLTG = this.Donhang.Giohangs[idx].SLTN =Number(input.value)
//               this.Donhang.Giohangs[idx].Tongtien = this.Donhang.Giohangs[idx].TongtienG = this.Donhang.Giohangs[idx].TongtienN = Number(input.value)*this.Donhang.Giohangs[idx].GiaCoSo
//             }
//         }
//         else {
//           if(Number(input.value)<=0)
//             {
//               this.Donhang.Giohangs[idx][fieldSL] = 1
//               this._snackBar.open(`Giá trị phải lớn hơn 0`, '', {
//                 duration: 1000,
//                 horizontalPosition: "end",
//                 verticalPosition: "top",
//                 panelClass: ['snackbar-error'],
//               }); 
//             }
//             else {
//               this.Donhang.Giohangs[idx][fieldSL]=Number(input.value)
//               this.Donhang.Giohangs[idx][fieldTong] = Number(input.value)*this.Donhang.Giohangs[idx].GiaCoSo
//           }
//         }
//         this.GiohangsEmit.emit(this.Donhang.Giohangs)
//       }
//       ChangeSoluong(idx:any,method:any,fieldTong:any,fieldSL:any){
//         if(fieldSL=='Soluong')
//           {
//             this.Donhang.Giohangs[idx].Soluong=Number(this.Donhang.Giohangs[idx][fieldSL])||0
//             if (this.Donhang.Giohangs[idx][fieldSL] <= 0 && method === 'giam') {
//               this._snackBar.open(`Giá trị phải lớn hơn 0`, '', {
//                 duration: 1000,
//                 horizontalPosition: 'end',
//                 verticalPosition: 'top',
//                 panelClass: ['snackbar-error'],
//               });
//               this.Donhang.Giohangs[idx][fieldSL] = 1;
//             }
//             else {
//               if(method=='giam'){
//                 this.Donhang.Giohangs[idx].Soluong = this.Donhang.Giohangs[idx].SLTG = this.Donhang.Giohangs[idx].SLTN = Number(this.Donhang.Giohangs[idx][fieldSL])-1
//                 this.Donhang.Giohangs[idx].Tongtien = this.Donhang.Giohangs[idx].TongtienG = this.Donhang.Giohangs[idx].TongtienN = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
//               }
//               else {
//                 this.Donhang.Giohangs[idx].Soluong = this.Donhang.Giohangs[idx].SLTG = this.Donhang.Giohangs[idx].SLTN = Number(this.Donhang.Giohangs[idx][fieldSL])+1
//                 this.Donhang.Giohangs[idx].Tongtien = this.Donhang.Giohangs[idx].TongtienG = this.Donhang.Giohangs[idx].TongtienN = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
//               }
//             }

//           }
//           else{
//             this.Donhang.Giohangs[idx][fieldSL]=Number(this.Donhang.Giohangs[idx][fieldSL])||0
//             if (this.Donhang.Giohangs[idx][fieldSL] <= 0 && method === 'giam') {
//               this._snackBar.open(`Giá trị phải lớn hơn 0`, '', {
//                 duration: 1000,
//                 horizontalPosition: 'end',
//                 verticalPosition: 'top',
//                 panelClass: ['snackbar-error'],
//               });
//               this.Donhang.Giohangs[idx][fieldSL] = 1;
//             }
//             else {
//               if(method=='giam'){
//                 this.Donhang.Giohangs[idx][fieldSL]--
//                 this.Donhang.Giohangs[idx][fieldTong] = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
//               }
//               else {
//                 this.Donhang.Giohangs[idx][fieldSL]++
//                 this.Donhang.Giohangs[idx][fieldTong] = this.Donhang.Giohangs[idx][fieldSL]*this.Donhang.Giohangs[idx].GiaCoSo
//               }
//             }
//        }
//        this.GiohangsEmit.emit(this.Donhang.Giohangs)
//       }
//       AddSanpham()
//       {
//         this.dialogRef = this.dialog.open(this.ChonSanphamDialog);
//         this.dialogRef.afterClosed().subscribe((result:any) => {
//           if (result == 'true') {
//             // this.Detail.Giohangs.Sanpham.push(this.Sanpham)
//             this._snackBar.open('Thêm Thành Công', '', {
//               duration: 1000,
//               horizontalPosition: 'end',
//               verticalPosition: 'top',
//               panelClass: ['snackbar-success'],
//             });
//           }
//         }); 
//       }
//       DoSearchSanpham(event: Event)
//       {
//         const filterValue = (event.target as HTMLInputElement).value;
//         this.FilterSanphams = this.Sanphams.filter((v)=>
//           v?.Title?.toLowerCase().includes(filterValue.toLowerCase())||
//           v?.Giagoc[0]?.MaSP?.toLowerCase().includes(filterValue.toLowerCase())
//       )
//         console.log(this.FilterSanphams);     
//       }

//       Chonsanpham(data:any,giagoc:any)
//       {
//         console.log(data);     
//           let item:any={}
//           item = giagoc
//           if(item.MaSP=='-1')
//             {
//               this._snackBar.open('Lỗi Sản Phẩm', '', {
//                 duration: 1000,
//                 horizontalPosition: 'end',
//                 verticalPosition: 'top',
//                 panelClass: ['snackbar-error'],
//               });
//             }
//        else {
//           item.Soluong=1
//           item.Title = data.Title
//           item.Image = data?.Image?.Hinhchinh?.src
//           const existingItemIndex =  this.Donhang.Giohangs?.findIndex((v: any) => v.MaSP === data.MaSP);
//           if (existingItemIndex !== -1) {
//                  this.Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
//                  this.Donhang.Giohangs[existingItemIndex].SLTT += Number(item.Soluong) * parseFloat(Number(item.khoiluong).toFixed(2));
//                  this.Donhang.Giohangs[existingItemIndex].Tongtien = this.Donhang.Giohangs[existingItemIndex].SLTT*this.Donhang.Giohangs[existingItemIndex].GiaCoSo
//            } else {
//                  item.SLTT = Number(item.khoiluong)
//                  item.Tongtien = item.SLTT*item.GiaCoSo
//                  item.SLTG = 0
//                  item.TongtienG = 0
//                  item.SLTN = 0
//                  item.TongtienN = 0
//                  this.Donhang.Giohangs.push(item);
//            }
//           console.log(item);
//           console.log(this.Donhang.Giohangs);
//           this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//           this.GiohangsEmit.emit(this.Donhang.Giohangs)
//           // this.dialogRef.close()
//         } 
//       }
//       ChonsanphamSi(data:any)
//       {
//         console.log(data);
        
//          let item:any={}
//           item = data
//           item.Soluong=1
//           item.Title = data.Title
//           item.SLTT = 1
//           item.Tongtien = Number(item.Soluong)*Number(item.giagoc)
//           item.SLTG = 1
//           item.TongtienG = Number(item.Soluong)*Number(item.giagoc)
//           item.SLTN = 1
//           item.TongtienN = Number(item.Soluong)*Number(item.giagoc)
//           this.Donhang.Giohangs.push(item);
//           console.log(item);
//           console.log(this.Donhang.Giohangs);
//           this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//           this.GiohangsEmit.emit(this.Donhang.Giohangs)
//           this.FilterSanphamsBansi = this.Sanphams.filter(v => 
//             !this.Donhang.Giohangs.some((v1: any) => 
//                 v1.MaSP === v.MaSP
//             )
//         );
//           // const data3 = data2.filter(item2 => !data1.some(item1 => item1.id === item2.id));
//       }
//       Xoasanpham(item:any){
//         console.log(item);
//         this.Donhang.Giohangs = this.Donhang.Giohangs.filter((v:any)=>v.MaSP!=item.MaSP)
//         this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//         this.GiohangsEmit.emit(this.Donhang.Giohangs)
//       }

//       Xoagiohang(){ 
//         this.Donhang.Giohangs = []
//         this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//         this.GiohangsEmit.emit(this.Donhang.Giohangs)
//       }
//       TinhTong(items:any,fieldTong:any){  
//         const subtotal = items?.reduce((sum:any, item:any) => sum + (item['Tongtien'] || 0), 0) || 0;
//         const shippingFee = this.Donhang?.Vanchuyen?.Phivanchuyen || 0;
//         const discount = this.Donhang?.Khuyenmai?.value || 0;
//         const tax = this.Donhang?.Thue || 0;
//         const grandTotal = subtotal + shippingFee + discount + tax;
//         this.TongcongEmit.emit({Tongcong:grandTotal,Tong:subtotal})
//         return items?.reduce((sum:any, item:any) => sum + item[fieldTong], 0);
//       }
//       TinhTongSub(items:any,fieldTong:any){  
//         console.log(items);
        
//         return items?.reduce((sum:any, item:any) => sum + (item[fieldTong] || 0), 0) || 0;
//       }
//       async LoadDrive()
//       {
//         const DriveInfo ={
//           IdSheet:'15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
//           SheetName:'Giohangimport',
//           ApiKey:'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao'
//         }
//       const result:any =  await this._DonhangsService.getDrive(DriveInfo) 
//       console.log(result);
//       const data =  ConvertDriveData(result.values);   
//       console.log(data);
//       data.forEach((v:any)=>{
//         const item = this.Sanphams.find((v1) => v1.MaSP === v.MaSP);
//         if(item)
//         {
//           v.id = item.id,
//           v.Title = item.Title,
//           v.MaSP = v.MaSP,
//           v.dvt = v.dvt,
//           v.giagoc = Number(v.giagoc),
//           v.Soluong = Number(v.Soluong),
//           v.Tongtien = Number(v.Tongtien),
//           v.SLTG = Number(v.SLTG),
//           v.TongtienG = Number(v.TongtienG),
//           v.SLTN = Number(v.SLTN),
//           v.TongtienN = Number(v.TongtienN)
//           v.Ghichu = v.Ghichu||''
//         }
//       })    
      
//       this.Donhang.Giohangs = data
//       this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//       this.GiohangsEmit.emit(this.Donhang.Giohangs)
//       console.log(this.Donhang.Giohangs);
//       this._snackBar.open('Cập Nhật Thành Công', '', {
//         duration: 1000,
//         horizontalPosition: "end",
//         verticalPosition: "top",
//         panelClass: ['snackbar-success'],
//         });
//       }

//      readExcelFile(event: any) {
//             const file = event.target.files[0];
//             const fileReader = new FileReader();
//             fileReader.onload = (e) => {
//               const data = new Uint8Array((e.target as any).result);
//               const workbook = XLSX.read(data, { type: 'array' });
//               const sheetName = workbook.SheetNames[0];
//               const worksheet = workbook.Sheets[sheetName];
//               const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//               console.log(jsonData);
//               jsonData.forEach((v:any)=>{
//                 const item = this.Sanphams.find((v1) => v1.MaSP === v.MaSP);
//                 if(item)
//                   {
//                     v.id = item.id,
//                     v.Title = item.Title,
//                     v.MaSP = v.MaSP,
//                     v.dvt = v.dvt,
//                     v.giagoc = Number(v.giagoc),
//                     v.Soluong = Number(v.Soluong),
//                     v.Tongtien = Number(v.Tongtien),
//                     v.SLTG = Number(v.SLTG),
//                     v.TongtienG = Number(v.TongtienG),
//                     v.SLTN = Number(v.SLTN),
//                     v.TongtienN = Number(v.TongtienN),
//                     v.Ghichu = v.Ghichu||''
//                   }
//               }) 
//               console.log(jsonData);
//               this.Donhang.Giohangs = jsonData
//               this.dataSource = new MatTableDataSource(this.Donhang.Giohangs); 
//               this.GiohangsEmit.emit(this.Donhang.Giohangs)
//               this._snackBar.open('Cập Nhật Thành Công', '', {
//                 duration: 1000,
//                 horizontalPosition: "end",
//                 verticalPosition: "top",
//                 panelClass: ['snackbar-success'],
//                 });              
//             };
//             fileReader.readAsArrayBuffer(file);
//           }

//           writeExcelFile() {
//             const data = this.Donhang.Giohangs.map((v:any)=>({
//               MaSP: v.MaSP,
//               dvt: v.dvt,
//               giagoc: Number(v.giagoc),
//               Soluong: Number(v.Soluong),
//               Tongtien: Number(v.Tongtien),
//               SLTG: Number(v.SLTG),
//               TongtienG: Number(v.TongtienG),
//               SLTN: Number(v.SLTN),
//               TongtienN: Number(v.TongtienN),
//               Ghichu: v.Ghichu||''
//             }))
//              const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
//             const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
//             const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//             this.saveAsExcelFile(excelBuffer, 'giohang_'+ moment().format("DD_MM_YYYY"));
//           }
//           saveAsExcelFile(buffer: any, fileName: string) {
//             const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
//             const url: string = window.URL.createObjectURL(data);
//             const link: HTMLAnchorElement = document.createElement('a');
//             link.href = url;
//             link.download = `${fileName}.xlsx`;
//             link.click();
//             window.URL.revokeObjectURL(url);
//             link.remove();
//           }


//     }


