import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms } from './listsanpham';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SanphamsService } from './listsanpham.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ConvertDriveData, convertToSlug } from '../../../shared/shared.utils';
import { DonhangsService } from '../../donhang/listdonhang/listdonhang.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listsanpham',
  templateUrl: './listsanpham.component.html',
  styleUrls: ['./listsanpham.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
})
export class ListsanphamComponent {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['STT','Title','MaSP', 'giagoc', 'dvt', 'Actions'];
  ColumnName: any = {'STT':'STT','Title': 'Tên Sản Phẩm','MaSP':'Mã Sản Phẩm', 'giagoc': 'Giá Gốc', 'dvt': 'Đơn Vị Tính' };
  Forms: any[] = Forms;
  FilterColumns: any[] = JSON.parse(localStorage.getItem('Sanpham_FilterColumns') || '[]');
  Columns: any[] = [];
  ListSanpham: any[] = [];
  CountItem: number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _SanphamsService: SanphamsService = inject(SanphamsService);
  private _DonhangsService: DonhangsService = inject(DonhangsService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = 'side';
      }
    });
    await this._SanphamsService.getAllSanpham();
    this.ListSanpham = this._SanphamsService.ListSanpham();
    this.initializeColumns();
    this.setupDataSource();
  }
    private initializeColumns(): void {
      this.Columns = Object.keys(this.ColumnName).map(key => ({
        key,
        value: this.ColumnName[key],
        isShow: true
      }));
      if (this.FilterColumns.length === 0) {
        this.FilterColumns = this.Columns;
      } else {
        localStorage.setItem('Sanpham_FilterColumns', JSON.stringify(this.FilterColumns));
      }
  
      this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
      this.ColumnName = this.FilterColumns.reduce((obj, item) => {
        if (item.isShow) obj[item.key] = item.value;
        return obj;
      }, {} as Record<string, string>);    
    }
  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.ListSanpham)
    this.CountItem = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find(v => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    this.setupDataSource();
    localStorage.setItem('Sanpham_FilterColumns', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter(v => v.value.toLowerCase().includes(query));    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.CountItem = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/sanpham', 0]);
  }

  goToDetail(item: any): void {
    console.log(item);
    
    this.drawer.open();
   // this.Detail = item;
    // this._router.navigate(['admin/sanphams', item.id]);
  }


    async LoadDrive()
      {
            const DriveInfo ={
              IdSheet:'15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
              SheetName:'SanphamImport',
              ApiKey:'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao'
            }
          const result:any =  await this._DonhangsService.getDrive(DriveInfo) 
          const data =  ConvertDriveData(result.values);   
          const transformedData = data.map((v: any) => ({
            Title: v?.Title?.trim(),
            MaSP: v?.MaSP?.trim(),
            giagoc: Number(v?.giagoc),
            dvt: v?.dvt,
          }));         
          const loadingSnackBarRef = this._snackBar.open('Đang Tải', '', {
            duration: 0,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-warning'],
          });
          let Sodem =0;
          // Tạo mảng các promise cho quá trình cập nhật sản phẩm
          const updatePromises = this._SanphamsService.ListSanpham().map((v: any, k: number) => {
            return new Promise<void>((resolve) => {
              setTimeout(async () => {
                const item = transformedData.find((v1: any) => v1.MaSP === v.MaSP);
                if (item && Number(item.giagoc) !== Number(v.giagoc)) {
                  console.log(item);
                  Sodem++;
                  v.Title = item.Title.trim();
                  v.giagoc = Number(item.giagoc);
                  v.dvt = item.dvt;
                  await this._SanphamsService.updateOneSanpham(v);
                }
                resolve();
              }, k * 10);
            });
          });
          
          // Chờ đợi tất cả các promise hoàn thành
          Promise.all(updatePromises).then(() => {
            console.log(Sodem);
            
            // Tắt snackbar "Đang Tải"
            loadingSnackBarRef.dismiss();
            // Mở snackbar thông báo thành công
            this._snackBar.open('Cập Nhật Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
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
      const transformedData = jsonData.map((v: any) => ({
        Title: v.Title.trim(),
        MaSP: v.MaSP.trim(),
        giagoc: Number(v.giagoc),
        dvt: v.dvt,
      }));

    const updatePromises = transformedData.map(async (v) => {
      const item = this._SanphamsService.ListSanpham().find((v1) => v1.MaSP === v.MaSP);
      if (item) {
      item.Title = v.Title;
      item.giagoc = v.giagoc;
      item.dvt = v.dvt;
      await this._SanphamsService.updateOneSanpham(item);
      }
    });
    Promise.all(updatePromises).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar-success'],
      });
      window.location.reload();
    });
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    console.log(this._SanphamsService.ListSanpham());
    const data = this._SanphamsService.ListSanpham().map((v)=>({
      Title: v.Title,
      MaSP: v.MaSP,
      giagoc: Number(v.giagoc),
      dvt: v.dvt,
    }))
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'danhsachsanpham_'+ moment().format("DD_MM_YYYY"));
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