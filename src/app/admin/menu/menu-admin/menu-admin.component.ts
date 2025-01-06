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
import { ConvertDriveData, convertToSlug, groupByfield } from '../../../shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subject, async, buffer, takeUntil } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { DanhmucService } from '../../main-admin/danhmuc/danhmuc.service';
import { MenuService } from '../menu.service';
import { HttpClient } from '@angular/common/http';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-menu',
  standalone: true,
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
    MatTreeModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: API_KEY,
      useValue: 'AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc',
    },
    GoogleSheetsDbService
  ],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  Detail: any = {};
  Lists: any = {}
  ChooseMenuCha: any = {}
  SelectItem: any = {}
  FilterLists: any[] = []
  pageSizeOptions: any[] = [5]
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize: 10,
    pageNumber: 0
  };
  sidebarVisible: boolean = false;
  _MenuService: MenuService = inject(MenuService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
  _googleSheetsDbService: GoogleSheetsDbService = inject(GoogleSheetsDbService)
  MenusDrive:any[]=[]
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  data: any;
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      pid: node.pid,
      Slug: node.Slug,
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
  hasChild = (_: number, node: any) => node.expandable;
  dataSource: any
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  async ngOnInit(): Promise<void> {
    this._MenuService.getAllMenu();
    this._MenuService.menus$.subscribe((data) => {
      if (data) {
        console.log(data);
        
        this.Lists = this.FilterLists =data
        this.dataSource = data
      }
    })
   // this.Lists = await this._MenuService.SearchMenu(this.SearchParams)
   // this.FilterLists = this.Lists.items
  //  this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
  }

  displayFn(data: any): string {    
    return data && data.Title ? data.Title : '';
  }
  FilterAuto(item: any) {   
    const value = (item.target as HTMLInputElement).value;
    this.FilterLists = this.Lists.filter((v:any) => v.Title.toLowerCase().includes(value.toLowerCase()));         
  }
  FillSlug() {
    this.Detail.Slug = this.ChooseMenuCha.Slug?this.ChooseMenuCha.Slug +'/'+ convertToSlug(this.Detail.Title): convertToSlug(this.Detail.Title)
  }
  onAutoChange(item: any) {   
    this.Detail.pid = item.id   
    this.Detail.Slug =  this.Detail.Slug?`${item.Slug}/${this.Detail.Slug}`:''    
    console.log(item);
    console.log(this.Detail.Slug);
    console.log(this.Detail);    
  }
  async LoadDrive()
  {
   const data =  await this._MenuService.getDrive();    
   this.MenusDrive =  data?.values?.slice(1).map((row:any) => {
    return {
      id: row[0],
      Title: row[1],
      Slug: row[2],
      pid: row[3],
    };
  });
   console.log(this.MenusDrive);     
  }

  async SyncDrive()
  {
    this.MenusDrive.forEach((v)=>{
      const item:any={}
      item.Title = v.Title
      item.Slug = v.Slug
      this._MenuService.CreateMenu(item)
    })
    {

    } 
  }
  GetTenDanhmuc(item: any) {
    return this.Lists.find((v: any) => v.id_cat == item)?.Title
  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._MenuService.UpdateMenu(item).then(() => {
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
    this.Lists = await this._MenuService.SearchMenu(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._MenuService.CreateMenu(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._MenuService.DeleteMenu(this.SelectItem).then(() =>{
          this.Detail ={}
          this.ngOnInit()
        } )
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
      const Menu = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Menu);
      console.log(groupByfield(Giagoc));
      Menu.forEach((v: any, k: any) => {
        setTimeout(() => {
          const item: any = {}
          const Image: any = { Main: v.photo, Thumb: v.thumb }
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
          this._MenuService.UpdateMenu(item)
          // this._MenuService.CreateMenu(item)
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
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Menu');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Menu_' + moment().format("DD_MM_YYYY"));
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
  UpdateStatusMenu(item: any) {
    item.Status = 0
    this._MenuService.UpdateMenu(item).then(() => this.ngOnInit())
  }

}