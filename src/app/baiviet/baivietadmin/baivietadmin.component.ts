import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, Type, ViewChild, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BaivietService } from '../baiviet.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import {Clipboard, ClipboardModule} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertToSlug } from '../../shared/shared.utils';
@Component({
  selector: 'app-baiviet',
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
    MatChipsModule,
    MatSelectModule,
    MatTreeModule,
    MatTableModule,
    ClipboardModule
  ],
  templateUrl: './baivietadmin.component.html',
  styleUrls: ['./baivietadmin.component.css']
})
export class BaivietAdminComponent implements OnInit {
  BaseURL:any = window.location.hostname;
  PortURL:any = window.location.port;
  Detail: any = {};
  Danhmuc: any = {Type:'baiviet'};
  ListDanhmuc: any[] = [];
  Lists: any={}
  SelectDanhmuc: any = {};
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:9999,
    pageNumber:0
  };
  TypeArticle:any[] = []
  
  _BaivietService:BaivietService = inject(BaivietService)
  _DanhmucService:DanhmucService = inject(DanhmucService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar
  ) {}
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      level: level,
      id:node.id,
      Soluong:node.Soluong,
      Image:node.Image,
      Slug:node.Slug,
      Type:node.Type,
      Ordering:node.Ordering,
    };
  };
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  treedataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
displayedColumns: string[] = ['Hinhanh', 'Title', 'Noibat', 'Trangthai','Action'];
dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  async ngOnInit(): Promise<void> {
    // console.log(this.BaseURL);
    // console.log(window.location.port);
    this.Lists = await this._BaivietService.SearchBaiviet(this.SearchParams)
    this.ListDanhmuc = (await this._DanhmucService.SearchDanhmuc({Type:'baiviet'}))?.items
    this.FilterLists = this.Lists.items
    // console.log('Baiviet',this.FilterLists);
    this.ListDanhmuc.forEach((v:any) => {
      v.Soluong = this.Lists.items.filter((v1:any)=>v1.idDM==v.id).length||0
   });
    this.treedataSource.data = this.ListDanhmuc
    this._BaivietService.baiviets$.subscribe((data:any) => {
      if (data) {
        //console.log('filter',data);
        this.FilterLists = data
        this.dataSource = new MatTableDataSource(data);
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
    })
    // const Data = this.ListDanhmuc.map((v:any)=>([...v.children.map((k:any)=>({...k,idDM:v.id}))]))
    // const Data1 = Data.flat(1)
    // // Data1.forEach((v)=>
    // // {
    // //   this._BaivietService.UpdateBaiviet(v)
    // // })
    // console.log(Data);
    // console.log(Data1);
    
  }

 async LoadDrive() {
  } 
  Coppy(item:any) {
    this.clipboard.copy(item);
  }
 async SyncDrive() {

  } 
  ChoosenDanhmuc(item:any)
  {
    this.SelectDanhmuc = item
    this.SearchParams.idDM = item.id  
    this._BaivietService.SearchBaiviet(this.SearchParams)
  }
 async ChoseType(item:any,index:any) {
    this.SearchParams.Slug = item.Slug
    this.Lists = await this._BaivietService.SearchBaiviet(this.SearchParams)
    this.FilterLists = this.Lists.items
  } 
  FillSlug()
  {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  FillSlugDanhmuc()
  {
    this.Danhmuc.Slug = convertToSlug(this.Danhmuc.Title)
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
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._BaivietService.UpdateBaiviet(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._BaivietService.SearchBaiviet(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._BaivietService.CreateBaiviet(this.Detail).then(()=>this.ngOnInit())
      }
    });
  }
  openDialogDanhmuc(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._BaivietService.CreateDanhmucbaiviet(this.Danhmuc).then(()=>this.ngOnInit())
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
           this._BaivietService.CreateBaiviet(v)
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
}