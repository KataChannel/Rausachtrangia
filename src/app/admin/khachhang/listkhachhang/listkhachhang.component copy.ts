// import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { Forms, ListKhachhang } from './listkhachhang';
// import { MatMenuModule } from '@angular/material/menu';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
// import { Router, RouterOutlet } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule }
// import { KhachhangsService } from './listkhachhang.service';
// import { MatSelectModule } from '@angular/material/select';
// import { CommonModule } from '@angular/common';
// import { LocalStorageService } from '../../../shared/localstorage.service';
//   @Component({
//     selector: 'app-listkhachhang',
//     templateUrl: './listkhachhang.component.html',
//     styleUrl: './listkhachhang.component.scss',
//     imports: [
//       MatFormFieldModule, 
//       MatInputModule, 
//       MatTableModule, 
//       MatSortModule, 
//       MatPaginatorModule,
//       MatMenuModule,
//       MatSidenavModule,
//       RouterOutlet,
//       MatIconModule,
//       MatButtonModule,
//       MatSelectModule,
//       CommonModule
//     ],
//   })
//   export class ListkhachhangComponent implements AfterViewInit {
//     Detail:any={}
//     dataSource!: MatTableDataSource<any>;
//     displayedColumns: string[] = [];
//     ColumnName:any={'STT':'STT'}
//     Forms:any[]=Forms
//     FilterColumns:any[]=JSON.parse(localStorage.getItem('KhachHang_FilterColumns')||'[]')
//     Columns:any[]=[]
//     ListKhachhang:any[]=ListKhachhang
//     @ViewChild(MatPaginator) paginator!: MatPaginator;
//     @ViewChild(MatSort) sort!: MatSort;
//     @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
//     _KhachhangsService:KhachhangsService = inject(KhachhangsService)
//     constructor(
//       private _breakpointObserver: BreakpointObserver,
//       private _router: Router,
//     ) {}
  
//     async ngOnInit(): Promise<void> {

//       await this._KhachhangsService.getAllKhachhang()
//       this._KhachhangsService.ListKhachhang()
//       // console.log(this._KhachhangsService.ListKhachhang());     
//       // console.log(this.ListKhachhang.slice(1));
//       // // this.ListKhachhang.slice(1).forEach((v:any)=>{
//       // //   this._KhachhangsService.CreateKhachhang(v)
//       // // })
//       if(this.FilterColumns.length===0)
//       {
//         this.FilterColumns = this.Columns = Object.keys(this.ListKhachhang[0]).reduce((arr, key) => {
//           arr.push({ key, value: this.ListKhachhang[0][key], isShow: true });
//           return arr;
//       }
//       , [] as { key: string; value: string; isShow: boolean }[]);
//       }
//       else
//       {
//         localStorage.setItem('KhachHang_FilterColumns', JSON.stringify(this.FilterColumns))
//       }
    

//     //   this.FilterColumns = this.Columns = Object.keys(this.ListKhachhang[0]).reduce((arr, key) => {
//     //     arr.push({ key, value: this.ListKhachhang[0][key], isShow: true });
//     //     return arr;
//     // }, [] as { key: string; value: string; isShow: boolean }[]);

//       console.log(this.FilterColumns);
      
//       this.displayedColumns = this.FilterColumns.filter((v:any)=>v.isShow).map((item:any)=>item.key)
//       this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//         if (item.isShow) obj[item.key] = item.value;
//         return obj;
//     }, {} as Record<string, string>);
//       this.dataSource = new MatTableDataSource(this._KhachhangsService.ListKhachhang().map((v:any)=>this.FilterColumns.filter((item:any)=>item.isShow).reduce((obj:any, item:any) => {
//         obj[item.key] = v[item.key];
//         return obj;
//       }, {}))); 
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort; 
//       this.Detail.id?this.drawer.open():this.drawer.close()
//       this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
//         if (result.matches) {
//          this.drawer.mode = 'over';
//          this.paginator.hidePageSize =true
//         } else {
//           this.drawer.mode = 'side';
//         }
//       });
      
//     }
//     ToogleColumn(item:any)
//     {
//       this.FilterColumns.find((v:any)=>v.key===item.key).isShow = !this.FilterColumns.find((v:any)=>v.key===item.key).isShow
//       this.displayedColumns = this.FilterColumns.filter((v:any)=>v.isShow).map((item:any)=>item.key)
//       this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//         if (item.isShow) obj[item.key] = item.value;
//         return obj;
//     }, {} as Record<string, string>);
//       this.dataSource = new MatTableDataSource(this._KhachhangsService.ListKhachhang().map((v:any)=>this.FilterColumns.filter((item:any)=>item.isShow).reduce((obj:any, item:any) => {
//         obj[item.key] = v[item.key];
//         return obj;
//       }, {}))); 
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;  
//       localStorage.setItem('KhachHang_FilterColumns', JSON.stringify(this.FilterColumns))
//     }

//     DoFilterColumns(event:any)
//     { 
//       const query = event.target.value.toLowerCase();
//       this.FilterColumns = this.Columns.filter((v:any)=>v.key.toLowerCase().includes(query)) 
//     }

//     ngAfterViewInit() { 
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//       this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
//       this.paginator._intl.nextPageLabel = 'Tiếp Theo';
//       this.paginator._intl.previousPageLabel = 'Về Trước';
//       this.paginator._intl.firstPageLabel = 'Trang Đầu';
//       this.paginator._intl.lastPageLabel = 'Trang Cuối';
//       this.paginator.pageSize = 20
//     }
  
//     applyFilter(event: Event) {
//       const filterValue = (event.target as HTMLInputElement).value;
//       this.dataSource.filter = filterValue.trim().toLowerCase();
  
//       if (this.dataSource.paginator) {
//         this.dataSource.paginator.firstPage();
//       }
//     }
//     Create()
//     {
//       this.drawer.open();
//       this._router.navigate(['admin/khachhangs', 0])
//     }
//     goToDetail(item:any)
//     {
//       this.drawer.open();
//       this.Detail=item
//       this._router.navigate(['admin/khachhangs', item.id])  }
//   }