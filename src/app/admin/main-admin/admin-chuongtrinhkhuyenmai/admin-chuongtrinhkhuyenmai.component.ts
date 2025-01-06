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
import {MatChipsModule} from '@angular/material/chips';
import { ChuongtrinhkhuyenmaiAdminService } from './admin-chuongtrinhkhuyenmai.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertToSlug } from '../../../shared/shared.utils';
@Component({
  selector: 'app-admin-chuongtrinhkhuyenmai',
  standalone:true,
  imports:[
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-chuongtrinhkhuyenmai.component.html',
  styleUrls: ['./admin-chuongtrinhkhuyenmai.component.css']
})
export class AdminChuongtrinhkhuyenmaiComponent implements OnInit {
  // Detail: any = {Code:'KM'+GenId(8,false)};
  Detail: any = {};
  Lists: any={}
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:10,
    pageNumber:0
  };
  TypeArticle:any[] = []
  pageSizeOptions: any[] = []
  ListLoaiKM:any=[
    {Title:'%',Value:'phantram'},
    {Title:'đ',Value:'giatri'},
    {Title:'Free Ship',Value:'free'},
  ]
  _ChuongtrinhkhuyenmaiAdminService:ChuongtrinhkhuyenmaiAdminService = inject(ChuongtrinhkhuyenmaiAdminService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Title', 'Code', 'Value', 'MinValue','NgayApdung','Type','Status','CreateAt','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  SelectItem: any = {}
    constructor(
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
    ) {
    }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._ChuongtrinhkhuyenmaiAdminService.SearchChuongtrinhkhuyenmaiAdmin(this.SearchParams)
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);
    this.FilterLists = this.Lists.items
    this.dataSource = new MatTableDataSource(this.Lists.items);
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch(property) {
    //     case 'Diachi': return item.Giohangs.Khachhang.Diachi;
    //     case 'Hoten': return item.Giohangs.Khachhang.Hoten;
    //     case 'SDT': return item.Giohangs.Khachhang.SDT;
    //     case 'Hinhthuc': return item.Thanhtoan.Hinhthuc;
    //     default: return item[property];
    //   }
    // };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     console.log(this.Lists);
  } 







  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.FilterLists = this.Lists.items.filter((v:any) => {
     return  v.Title.toLowerCase().includes(value)||v.Mota.toLowerCase().includes(value)
       })
    }
    else {this.FilterLists = this.Lists.items}
  }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._ChuongtrinhkhuyenmaiAdminService.SearchChuongtrinhkhuyenmaiAdmin(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>,isUpdate:boolean,item:any): void {
    const dialogRef = this.dialog.open(teamplate);
    if(isUpdate)
    {
      this.Detail = item
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if(this.Detail.Type.Value=='free'){ this.Detail.Value = 0}
          this._ChuongtrinhkhuyenmaiAdminService.UpdateChuongtrinhkhuyenmaiAdmin(this.Detail).then(()=>{
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 1000,
            });
          })
        }
      });
    }
    else{
      this.Detail = {}
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if(this.Detail.Type.Value=='free'){ this.Detail.Value = 0}
          this._ChuongtrinhkhuyenmaiAdminService.CreateChuongtrinhkhuyenmaiAdmin(this.Detail).then(()=>{
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 1000,
            });
          })
        }
      });
    }

  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._ChuongtrinhkhuyenmaiAdminService.UpdateChuongtrinhkhuyenmaiAdmin(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      const transformedData = jsonData.map((v:any, k) => ({
       Title: v.name_vi,
        Mota: v.mota_vi,
        Motangan: v.description||'',
       Slug: v.tenkhongdau,
        Noidung: v.content_vi,
        Ordering: v.stt,
        Status: v.hienthi,
        Image: { Main: v.photo, Thumb: v.thumb },
        Noibat: v.tinnoibat,
        Type: { Title: v.Type, Slug: convertToSlug(v.Type) },
      }));
      transformedData.forEach((v:any,k:any) => {
        setTimeout(() => {
           this._ChuongtrinhkhuyenmaiAdminService.CreateChuongtrinhkhuyenmaiAdmin(v)
        }, 100*k);
      });
      console.log(transformedData);
      
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
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
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.SelectItem.isDelete = true
       this._ChuongtrinhkhuyenmaiAdminService.DeleteChuongtrinhkhuyenmaiAdmin(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
}