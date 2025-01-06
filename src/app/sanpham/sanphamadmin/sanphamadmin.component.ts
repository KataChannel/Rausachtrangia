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
import { ButtonModule } from 'primeng/button';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subject, async, buffer, takeUntil } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { SanphamService } from '../sanpham.service';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HinhanhComponent } from '../../shared/hinhanh/hinhanh.component';
import { convertToSlug, groupByfield } from '../../shared/shared.utils';
@Component({
  selector: 'app-sanphamadmin',
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
    MatTableModule,
    HinhanhComponent
  ],
  providers: [
    {
      provide: API_KEY,
      useValue: 'AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc',
    },
    GoogleSheetsDbService
  ],
  templateUrl: './sanphamadmin.component.html',
  styleUrls: ['./sanphamadmin.component.css']
})
export class SanphamAdminComponent implements OnInit {
  Detail: any = {};
  Lists: any = {}
  SelectItem: any = {}
  SelectDanhmuc: any = {}
  ListDanhmuc: any = []
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    pageSize: 9999,
    pageNumber: 0
  };
  sidebarVisible: boolean = false;
  Danhmuc: any = { Type: 'sanpham' };
  _SanphamService: SanphamService = inject(SanphamService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
  _googleSheetsDbService: GoogleSheetsDbService = inject(GoogleSheetsDbService)
  SanphamsDrive: any[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      level: level,
      id: node.id,
      item: node,
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
  displayedColumns: string[] = ['Hinhanh', 'Title', 'Status', 'Banchay', 'Goiy', 'Giare', 'Hanhdong'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.ListDanhmuc = (await this._DanhmucService.SearchDanhmuc({ Type: 'sanpham', pageSize: 999 }))?.items
    this.ListDanhmuc.forEach((v: any) => {
      v.Soluong = this.Lists.items.filter((v1: any) => v1.idDM == v.id).length || 0
    });
    this.treedataSource.data = this.ListDanhmuc
    console.log(this.ListDanhmuc);

    // this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
    this._SanphamService.sanphams$.subscribe((data) => {
      if (data) {
        this.FilterLists = data
        //console.log(data.map(v=>([v.Giagoc.map])));
        //console.log(data.flatMap(item => item.Giagoc).map(item => item));

        // data.forEach((el:any) => {
        //   el.Giagoc.forEach((v:any) => {
        //     v.GiaCoSo =  Number(el.GiaCoSo)
        //   });
        //   this._SanphamService.UpdateSanpham(el)
        // });



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
    this.Danhmuc.Image.Hinhchinh = e
    this._DanhmucService.UpdateDanhmuc(this.Danhmuc)
  }



  MapColumns(item: any) {
    return item.map((v: any) => v.id)
  }

  ChoosenDanhmuc(item: any) {
    if (this.SelectDanhmuc.id == item.id) {
      delete this.SearchParams.idDM
      this.SelectDanhmuc = {}
      this._SanphamService.SearchSanpham(this.SearchParams)
    }
    else {
      this.SelectDanhmuc = item
      this.SearchParams.idDM = item.id
      this._SanphamService.SearchSanpham(this.SearchParams)
    }
  }
  UpdateAllSanpham() {
    this.FilterLists.forEach((v: any) => {
      v.Giagoc.forEach((v1: any) => {
        v1.GiaCoSo = v.GiaCoSo
        v1.SLTT = 0
      });
      this._SanphamService.UpdateSanpham(v)
    });
  }
  async LoadDrive() {
    const data = await this._SanphamService.getDrive();
    this.SanphamsDrive = data.values.slice(1).map((row: any) => {
        return {
          MaSP: row[0],
          Title: row[1],
          Slug: convertToSlug(row[1]).replace(/--+/, "-"),
          Danhmuc: row[2],
          idDM: row[6],
          GiaCoSo: Number(row[3].replace(".", ""))||null,
          Giagoc: [{
            MaSP: row[0] + '-1',
            khoiluong: parseFloat(row[4].replace(/,/g, '.')),
            gia: Number(row[3].replace(".", "")) * parseFloat(row[4].replace(/,/g, '.'))||null,
            dvt: row[5],
            GiaCoSo: Number(row[3].replace(".", ""))||null,
            SLTT: 0
          }]
        };
    });
    this.SanphamsDrive = this.SanphamsDrive.filter((v)=>v.GiaCoSo!=null)
    console.log(this.SanphamsDrive);
  }
  async SyncDrive() {
    const AllSanphams = (await this._SanphamService.SearchSanpham({ pageSize: 9999 }))?.items
    const data1 = this.SanphamsDrive.filter((v) => AllSanphams.some((v1: any) => v1.MaSP == v.MaSP));
    const data2 = data1.map((v: any) => ({ ...AllSanphams.find((v1: any) => v1.MaSP == v.MaSP), ...v }))
    const data3 = this.SanphamsDrive.filter((v) => !AllSanphams.some((v1: any) => v1.MaSP == v.MaSP));
    const data4 = AllSanphams.filter((v: any) => !this.SanphamsDrive.some((v1: any) => v1.MaSP == v.MaSP || v1.GiaCoSo=='null'));
    console.log("Trùng",data1);
    console.log("Cập Nhật",data2);
    console.log("Sản Phẩm Mới",data3);
    console.log("Xoá",data4);
    
    // data4.forEach((v: any, k: any) => {
    //   setTimeout(() => {
    //     this._SanphamService.DeleteSanpham(v)
    //   }, k * 300);
    // });
    // console.log(data4);

    if (data3.length > 0) {
      data3.forEach((v: any, k: any) => {
        setTimeout(() => {
          delete v.Danhmuc
          this._SanphamService.CreateSanpham(v)
        }, k * 500);
      });
    }
    if (data2.length > 0) {
      data2.forEach((v: any, k: any) => {
        setTimeout(() => {
          this._SanphamService.UpdateSanpham(v)
        }, k * 700);
      });
    }
  }
  async UpdateSyncDrive() {
    this.SanphamsDrive.forEach((v) => {
      v.id = "Code"
      this._SanphamService.UpdateSanpham(v)
    })
  }
  GetTenDanhmuc(item: any) {
    return this.ListDanhmuc.find((v: any) => v.id_cat == item)?.Title
  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._SanphamService.UpdateSanpham(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 1000,
      });
    })
  }
  // async applyFilter(event: Event) {
  //   const value = (event.target as HTMLInputElement).value.trim();
  //   this.SearchParams.Query = value.length > 1 ? value : undefined; // Ternary for concise query update
  //   this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams);
  //   this.FilterLists = this.Lists.items;
  // }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._SanphamService.CreateSanpham(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._SanphamService.DeleteSanpham(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
  openDialogDanhmuc(teamplate: TemplateRef<any>, item: any, action: any): void {
    console.log(item);

    if (action == "edit") { this.Danhmuc = item } else { this.Danhmuc = { Type: 'sanpham' } }
    const dialogRef = this.dialog.open(teamplate, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "true") {
        if (action == "edit") {
          this._DanhmucService.UpdateDanhmuc(this.Danhmuc).then(() => {
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 2000,
            });
            this.ngOnInit()
          }

          )
        }
        else[
          this._DanhmucService.CreateDanhmuc(this.Danhmuc).then(() => {
            this._snackBar.open('Thêm Mới Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 2000,
            });
            this.ngOnInit()
          })
        ]

      }
    });
  }
  XoaDanhmucDialog(teamplate: TemplateRef<any>, item: any, type: any): void {
    const dialogRef = this.dialog.open(teamplate, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        if (type == 'danhmuc') this._DanhmucService.DeleteDanhmuc(item).then(() => {
          this._snackBar.open('Xoá Thành Công', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'success',
            duration: 2000,
          });
          this.ngOnInit()
        })
        else this._SanphamService.DeleteSanpham(item).then(() => {
          this._snackBar.open('Xoá Thành Công', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'success',
            duration: 2000,
          });
          this.ngOnInit()
        })
      }
    });
  }

  FillSlug() {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  FillSlugDanhmuc() {
    this.Danhmuc.Slug = convertToSlug(this.Danhmuc.Title)
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
      const Sanpham = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Sanpham);
      console.log(groupByfield(Giagoc));
      Sanpham.forEach((v: any, k: any) => {
        setTimeout(() => {
          const item: any = {}
          const Image: any = { Main: v.photo, Thumb: v.thumb }
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
          this._SanphamService.UpdateSanpham(item)
          // this._SanphamService.CreateSanpham(item)
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
      // v.Giagoc.forEach((gg: any) => {
      //   item = { ...item, ...gg }
      //   Giagoc.push(item)
      // });
    });
    const ExportData = this.FilterLists.map((v: any) => (
      {
        'Mã Sản Phẩm': v.MaSP,
        'Tên Sản Phẩm': v.Title,
        'Danh Mục': v.Danhmuc,
        'Giá Cơ Sở': v.GiaCoSo,
      }))
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ExportData);
    // const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Sanpham');
    // XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Sanpham_' + moment().format("DD_MM_YYYY"));
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
  UpdateStatusSanpham(item: any) {
    item.Status = 0
    this._SanphamService.UpdateSanpham(item).then(() => this.ngOnInit())
  }
}