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
import { MatPaginatorModule } from '@angular/material/paginator';
import { ButtonModule } from 'primeng/button';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, async, buffer, takeUntil } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { CustomtableComponent } from '../../shared/customtable/customtable.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeModule } from '@angular/material/tree';
import { CauhinhService } from '../cauhinh.service';
import { convertToSlug, groupByfield } from '../../shared/shared.utils';
@Component({
  selector: 'app-cauhinhadmin',
  standalone:true,
  imports: [
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
    MatSelectModule,
    MatBadgeModule,
    MatTreeModule
  ],
  templateUrl: './cauhinhadmin.component.html',
  styleUrls: ['./cauhinhadmin.component.css']
})
export class CauhinhadminComponent implements OnInit {
  Detail: any = {};
  Lists: any = {}
  SelectItem: any = {}
  ListDanhmuc: any = []
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize: 10,
    pageNumber: 0
  };
  sidebarVisible: boolean = false;
  _CauhinhService: CauhinhService = inject(CauhinhService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
  CauhinhsDrive:any[]=[]
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      Slug: node.Slug,
      id: node.id,
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
  async ngOnInit(): Promise<void> {
    this.Lists = await this._CauhinhService.SearchCauhinh(this.SearchParams)
    console.log(this.Lists);
    this.ListDanhmuc = await this._DanhmucService.getAllDanhmuc()
     this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
    this._CauhinhService.cauhinhs$.subscribe((data:any) => {
      if (data) {
        console.log(data);
        this.treedataSource.data = data
      }
    })
  }

  async LoadDrive()
  {
   const data =  await this._CauhinhService.getDrive();   
   this.CauhinhsDrive = data.values.slice(1).map((row:any) => {
    return {
      MaSP: row[0],
      Title: row[1],
      Slug:convertToSlug(row[1]),
      Danhmuc: row[2],
      id_cat:row[6],
      GiaCoSo: Number(row[3].replace(".", "")),
      Giagoc:[{
        MaSP:row[0]+'-1',
        khoiluong:parseFloat(row[4].replace(/,/g, '.')),
        gia:Number(row[3].replace(".", ""))*parseFloat(row[4].replace(/,/g, '.')),
        dvt:row[5],
        GiaCoSo:Number(row[3].replace(".", "")),
        SLTT:0
      }]
    };
  });
   console.log(this.CauhinhsDrive); 
  }
  async SyncDrive()
  {
    this.CauhinhsDrive.forEach((v)=>{
      this._CauhinhService.CreateCauhinh(v)
    })
  }
  GetTenDanhmuc(item: any) {
    return this.ListDanhmuc.find((v: any) => v.id_cat == item)?.Title
  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._CauhinhService.UpdateCauhinh(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
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
    this.Lists = await this._CauhinhService.SearchCauhinh(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._CauhinhService.CreateCauhinh(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._CauhinhService.DeleteCauhinh(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
  FillSlug() {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
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
      const Cauhinh = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Cauhinh);
      console.log(groupByfield(Giagoc));
      Cauhinh.forEach((v: any, k: any) => {
        setTimeout(() => {
          const item: any = {}
          const Image: any = { Main: v.photo, Thumb: v.thumb }
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
          this._CauhinhService.UpdateCauhinh(item)
          // this._CauhinhService.CreateCauhinh(item)
          console.log(item);
        }, 100 * k);
      });


    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    let Giagoc: any = []
    let item: any = {}
    this.FilterLists.forEach((v: any) => {
      item.idSP = v.id
      item.TenSP = v.Title
      v.Giagoc.forEach((gg: any) => {
        item = { ...item, ...gg }
        Giagoc.push(item)
      });
    });
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Cauhinh');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Cauhinh_' + moment().format("DD_MM_YYYY"));
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
  UpdateStatusCauhinh(item: any) {
    item.Status = 0
    this._CauhinhService.UpdateCauhinh(item).then(() => this.ngOnInit())
  }
}