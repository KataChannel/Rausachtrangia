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
import { MatPaginatorModule } from '@angular/material/paginator';
import { BaivietAdminService } from './baiviet-admin.service';
import {MatChipsModule} from '@angular/material/chips';
import { convertToSlug } from '../../../shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { async, buffer } from 'rxjs';
@Component({
  selector: 'app-baiviet-admin',
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
    MatTreeModule
  ],
  templateUrl: './baiviet-admin.component.html',
  styleUrls: ['./baiviet-admin.component.css']
})
export class BaivietAdminComponent implements OnInit {
  Detail: any = {};
  Danhmuc: any = {};
  ListDanhmuc: any[] = [];
  Lists: any={}
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:9999,
    pageNumber:0
  };
  TypeArticle:any[] = []
  
  _BaivietAdminService:BaivietAdminService = inject(BaivietAdminService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
  ) {
  }


  
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      level: level,
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
  async ngAfterViewInit() {
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
    this.ListDanhmuc = await this._BaivietAdminService.getAllDanhmucbaiviet()
    this.TypeArticle = await this._BaivietAdminService.GetLListTypeBaiviet()
    console.log(this.Lists);
    console.log(this.ListDanhmuc);
    this.FilterLists = this.Lists.items
    this.ListDanhmuc.forEach((v)=>{v.children = this.FilterLists.filter((k:any)=>k.Type.Slug==v.Slug)})
    this.treedataSource.data = this.ListDanhmuc
    console.log(this.ListDanhmuc);
  }

 async LoadDrive() {

  } 
 async SyncDrive() {

  } 
 async ChoseType(item:any,index:any) {
    this.SearchParams.Slug = item.Slug
    this.Lists = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
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
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._BaivietAdminService.CreateBaivietAdmin(this.Detail).then(()=>this.ngOnInit())
      }
    });
  }
  openDialogDanhmuc(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._BaivietAdminService.CreateDanhmucbaiviet(this.Danhmuc).then(()=>this.ngOnInit())
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
           this._BaivietAdminService.CreateBaivietAdmin(v)
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