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
import { MatBadgeModule } from '@angular/material/badge';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeModule } from '@angular/material/tree';
import { UsergroupService } from '../usergroup.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { convertToSlug, groupByfield } from '../../shared/shared.utils';
@Component({
  selector: 'app-usergroupadmin',
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
  templateUrl: './usergroupadmin.component.html',
  styleUrls: ['./usergroupadmin.component.css']
})
export class UsergroupadminComponent implements OnInit {
  Detail: any = {};
  Lists: any = {}
  SelectItem: any = {}
  ListDanhmuc: any = []
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  SearchParams: any = {
    pageSize: 10,
    pageNumber: 0
  };
  sidebarVisible: boolean = false;
  _UsergroupService: UsergroupService = inject(UsergroupService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
  UsergroupsDrive:any[]=[]
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
  ) {}
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
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
    this.Lists = await this._UsergroupService.SearchUsergroup(this.SearchParams)
    //console.log(this.Lists);
    this.ListDanhmuc = await this._DanhmucService.getAllDanhmuc()
    this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
    this._UsergroupService.usergroups$.subscribe((data:any) => {
      if (data) {
        console.log(data);
        this.treedataSource.data = data
      }
    })
  }
  async LoadDrive()
  {
   const data =  await this._UsergroupService.getDrive();   
   this.UsergroupsDrive = data.values.slice(1).map((row:any) => {
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
   console.log(this.UsergroupsDrive); 
  }
  async SyncDrive()
  {
    this.UsergroupsDrive.forEach((v)=>{
      this._UsergroupService.CreateUsergroup(v)
    })
  }
  GetTenDanhmuc(item: any) {
    return this.ListDanhmuc.find((v: any) => v.id_cat == item)?.Title
  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._UsergroupService.UpdateUsergroup(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }

  async applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.SearchParams.Query = value.length > 1 ? value : undefined; // Ternary for concise query update
    this.Lists = await this._UsergroupService.SearchUsergroup(this.SearchParams);
    this.FilterLists = this.Lists.items;
  }

  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._UsergroupService.SearchUsergroup(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._UsergroupService.CreateUsergroup(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._UsergroupService.DeleteUsergroup(this.SelectItem).then(() => this.ngOnInit())
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
      const Usergroup = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Usergroup);
      console.log(groupByfield(Giagoc));
      Usergroup.forEach((v: any, k: any) => {
        setTimeout(() => {
          const item: any = {}
          const Image: any = { Main: v.photo, Thumb: v.thumb }
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
          this._UsergroupService.UpdateUsergroup(item)
          // this._UsergroupService.CreateUsergroup(item)
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
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Usergroup');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Usergroup_' + moment().format("DD_MM_YYYY"));
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
  UpdateStatusUsergroup(item: any) {
    item.Status = 0
    this._UsergroupService.UpdateUsergroup(item).then(() => this.ngOnInit())
  }
}