import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { async, buffer } from 'rxjs';
import { BaivietAdminService } from '../../admin/main-admin/baiviet-admin/baiviet-admin.service';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { HinhanhComponent } from '../../shared/hinhanh/hinhanh.component';
import { SlideService } from '../slide.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { convertToSlug } from '../../shared/shared.utils';
@Component({
  selector: 'app-slideadmin',
  standalone: true,
  imports: [
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
    MatTreeModule,
    HinhanhComponent,
    MatTableModule
  ],
  templateUrl: './slideadmin.component.html',
  styleUrls: ['./slideadmin.component.css']
})
export class SlideadminComponent implements OnInit {
  Detail: any = {Hinhchinh:''};
  Danhmuc: any = { Type: 'slide',Config:{default:4,xs:1,md:2,lg:3}};
  SelectDanhmuc: any = {};
  ListDanhmuc: any[] = [];
  Lists: any = {}
  FilterLists: any[] = []
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize: 100,
    pageNumber: 0
  };
  TypeArticle: any[] = []

  _SlideService: SlideService = inject(SlideService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
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
      id: node.id,
      item:node,
      Soluong: node.Soluong,
      Image: node.Image,
      Slug: node.Slug,
      Type: node.Type,
      Ordering: node.Ordering,
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
  displayedColumns: string[] = ['Hinhanh', 'Title','Ordering', 'Noibat', 'Trangthai', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  async ngOnInit(): Promise<void> {
    this.Lists = await this._SlideService.SearchSlide(this.SearchParams);
    this.ListDanhmuc = (await this._DanhmucService.getAllDanhmuc()).filter((v: any) => v.Type == 'slide');
    this.ListDanhmuc.forEach((v: any) => {
      v.Soluong = this.Lists.items.filter((v1: any) => v1.idDM == v.id).length || 0;
    });
    this.FilterLists = this.Lists.items;
    this.ListDanhmuc.forEach((v) => { v.children = this.FilterLists.filter((k: any) => k.Type.Slug == v.Slug); });
    this.treedataSource.data = this.ListDanhmuc;
    this._SlideService.slides$.subscribe((data: any) => {
      if (data) {
        console.log('filter', data);
        this.FilterLists = data
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
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

  }
  GetUpload(e: any) {
    console.log(e);
    this.Detail.Image.Hinhchinh = e
    console.log(this.Detail);
    
    this._SlideService.UpdateSlide(this.Detail);
  }
  async LoadDrive() {

  }
  ChoosenDanhmuc(item: any) {
    this.SelectDanhmuc = item
    this.SearchParams.idDM = item.id
    this._SlideService.SearchSlide(this.SearchParams)
  }
  async SyncDrive() {

  }
  async ChoseType(item: any, index: any) {
    this.SearchParams.Slug = item.Slug
    this.Lists = await this._SlideService.SearchSlide(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  FillSlug() {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  FillSlugDanhmuc() {
    this.Danhmuc.Slug = convertToSlug(this.Danhmuc.Title)
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.FilterLists = this.Lists.items.filter((v: any) => {
        return v.Title.toLowerCase().includes(value) || v.Mota.toLowerCase().includes(value)
      })
    }
    else { this.FilterLists = this.Lists.items }
  }
  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._SlideService.SearchSlide(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>, item: any, action: any): void {
    if (action == "edit") { this.Detail = item } else { this.Detail = {} }
    const dialogRef = this.dialog.open(teamplate, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "true") {
        if (action == "edit") {
          this._SlideService.UpdateSlide(this.Detail).then(() => this.ngOnInit())
        }
        else[
          this._SlideService.CreateSlide(this.Detail).then(() => this.ngOnInit())
        ]

      }
    });

  }
  openDialogDanhmuc(teamplate: TemplateRef<any>, item: any, action: any): void {
    console.log(item);
    
    if (action == "edit") { this.Danhmuc = item } else { this.Danhmuc = {} }
    const dialogRef = this.dialog.open(teamplate, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "true") {
        if (action == "edit") {
          console.log(this.Danhmuc);
          
          this._DanhmucService.UpdateDanhmuc(this.Danhmuc).then(() => this.ngOnInit())
        }
        else[
          this._DanhmucService.CreateDanhmuc(this.Danhmuc).then(() => this.ngOnInit())
        ]

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
      const transformedData = jsonData.map((v: any, k) => ({
        Title: v.name_vi,
        Mota: v.mota_vi,
        Motangan: v.description || '',
        Slug: v.tenkhongdau,
        Noidung: v.content_vi,
        Ordering: v.stt,
        Status: v.hienthi,
        Image: { Main: v.photo, Thumb: v.thumb },
        Noibat: v.tinnoibat,
        Type: { Title: v.Type, Slug: convertToSlug(v.Type) },
      }));
      transformedData.forEach((v: any, k: any) => {
        setTimeout(() => {
          this._SlideService.CreateSlide(v)
        }, 100 * k);
      });
      console.log(transformedData);

    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { id: 'TeXqj8Q2', Ngay: '02_06_2023', Buy: '1111', Sell: '11111' },
      { id: 'TeXqj8Q3', Ngay: '02_06_2023', Buy: '1111', Sell: '11111' },
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