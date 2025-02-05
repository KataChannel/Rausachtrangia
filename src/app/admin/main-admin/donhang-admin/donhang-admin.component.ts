import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ButtonModule } from 'primeng/button';
import moment from 'moment';
import { ListHinhthucthanhtoan, ListTrangThaiDonhang, groupByfield } from '../../../shared/shared.utils';
import { GiohangService } from '../website/giohang/giohang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../users/auth/users.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-donhang-admin',
  standalone:true,
  imports:[
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    ButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './donhang-admin.component.html',
  styleUrls: ['./donhang-admin.component.css']
})
export class DonhangAdminComponent implements OnInit {
  Detail: any = {};
  Lists: any={}
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize:9999,
    pageNumber:0,
    isDelete:false
  };
  sidebarVisible: boolean = false;
  ListTrangThaiDonhang:any=ListTrangThaiDonhang
  _GiohangService:GiohangService = inject(GiohangService)
  _UsersService: UsersService = inject(UsersService)
  Profile: any = {}
  SelectItem: any = {}
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Ngay','MaDonHang', 'Hoten','SDT','Total','Hinhthuc','Status','Action'];
dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
this._UsersService.getProfile().then((data) => {
      if (data) {
        this.Profile = data
      }
    })
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._GiohangService.SearchDonhang(this.SearchParams)
    this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);
    this.dataSource = new MatTableDataSource(this.FilterLists);
    console.log(this.FilterLists);
    
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'Diachi': return item.Giohangs.Khachhang.Diachi;
        case 'Hoten': return item.Giohangs.Khachhang.Hoten;
        case 'SDT': return item.Giohangs.Khachhang.SDT;
        case 'Hinhthuc': return item.Thanhtoan.Hinhthuc;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  UpdateAllDonhang()
  {
     
    // const Giohang = this.Lists.items.map((v:any)=>(v.Giohangs)).filter((v1:any)=>v1!=null)
    // Giohang.forEach((v:any) => {
    //   v.Sanpham.forEach((v1:any) => {
    //     v1.Giachon.GiaCoSo = (v1.Giachon.gia/v1.Giachon.khoiluong).toFixed(0)
    //     v1.Giachon.SLTT = (v1.Giachon.khoiluong).toFixed(2)
    //   });
    // });
    // Giohang.forEach((v:any) => {
    //   const item:any={}
    //   item.Giohangs = v
    //   this._GiohangService.UpdateDonhang(item)
    // });
    // console.log(Giohang);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchString = filter.toLowerCase();
      return (
        data.Khachhang.SDT.toLowerCase().includes(searchString) ||
        data.Khachhang.Hoten.toLowerCase().includes(searchString) ||
        data.Khachhang.Diachi.toLowerCase().includes(searchString)
      );
    };
    console.log(this.dataSource.filteredData);
  }
  // applyFilter(event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   if (value.length > 1) {
  //     this.FilterLists = this.Lists.items.filter((v:any) => {
  //    return  v.MaDonHang.toLowerCase().includes(value.toLowerCase())
  //    ||v.Khachhang?.SDT?.toLowerCase().includes(value.toLowerCase())
  //    ||v.Khachhang?.Hoten?.toLowerCase().includes(value.toLowerCase())
  //    ||v.Khachhang?.Diachi?.toLowerCase().includes(value.toLowerCase())
  //      })
  //   }
  //   else {this.FilterLists = this.Lists.items}
  // }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._GiohangService.SearchDonhang(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._GiohangService.CreateDonhang(this.Detail)
      }
    });
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetName1 = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const worksheet1 = workbook.Sheets[sheetName1];
      const DonhangAdmin = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc:any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(DonhangAdmin);
      console.log(groupByfield(Giagoc));
      DonhangAdmin.forEach((v:any,k:any) => {
        setTimeout(() => {
          const item:any={}
          const Image:any = {Main:v.photo,Thumb:v.thumb}
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg:any)=>gg.idSP==v.id).children||[]
           this._GiohangService.UpdateDonhang(item)
          // this._DonhangAdminService.CreateDonhangAdmin(item)
          console.log(item);
        }, 100*k);
      });

      
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    let Giagoc:any=[]
    let item:any={}
    this.FilterLists.forEach((v:any) => {  
        item.idSP =v.id
        item.TenSP =v.Title
        v.Giagoc.forEach((gg:any) => {
          item = {...item,...gg}
          Giagoc.push(item)
        });
    });    
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'DonhangAdmin');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'DonhangAdmin_'+moment().format("DD_MM_YYYY"));
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
  GetStatus(item:any,field:any)
  {
    const result = ListTrangThaiDonhang.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  GetHinhthucthanhtoan(item:any,field:any)
  {
    const result = ListHinhthucthanhtoan.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  ChangeStatus(item: any, item1: any) {    
     item.Status=item1.id
      this._GiohangService.UpdateDonhang(item).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'success',
          duration: 1000,
        });
      })
     }
     XoaDialog(teamplate: TemplateRef<any>): void {
      const dialogRef = this.dialog.open(teamplate, {
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          this.SelectItem.isDelete = true
         this._GiohangService.DeleteDonhang(this.SelectItem).then(() => this.ngOnInit())
        }
      });
    }
}