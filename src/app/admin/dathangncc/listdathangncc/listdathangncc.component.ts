import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, ListDathangncc } from './listdathangncc';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NhacungcapsService } from './listnhacungcap.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonnccsService } from './listdathangncc.service';
@Component({
  selector: 'app-listdathangncc',
  templateUrl: './listdathangncc.component.html',
  styleUrls: ['./listdathangncc.component.scss'],
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
    FormsModule,
    MatTooltipModule
  ],
})
export class ListDathangnccComponent {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'MaDH',
    'idNCC',
    'Sanpham',
    'CreateAt',
  ];
  ColumnName: any = {
    STT: 'STT',
    MaDH: 'Mã Đơn hàng',
    idNCC: 'Nhà Cung Cấp',
    Sanpham: 'Sản Phẩm',
    CreateAt: 'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('dathangncc_FilterColumns') || '[]'
  );
  Columns: any[] = [];
  Listdathangncc: any[] = [];
  ListNhacungcap: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _nhacungcapsService: NhacungcapsService = inject(NhacungcapsService);
  private _DonnccsService: DonnccsService = inject(DonnccsService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }
  createFilter(): (data: any, filter: string) => boolean {    
    return (data, filter) => {
      const filterObject = JSON.parse(filter); // Chuyển đổi filter từ string sang object
      let isMatch = true;
      console.log(data, filter);
      // Kiểm tra từng điều kiện lọc
      this.displayedColumns.forEach(column => {
        if (filterObject[column]) {
          isMatch = isMatch && data[column].toString().toLowerCase().includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }

  // Hàm áp dụng bộ lọc
  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  async ngOnInit(): Promise<void> {
    await this._DonnccsService.getAllDonncc();
    this.Listdathangncc = this._DonnccsService.ListDonncc();
    this.CountItem = this.Listdathangncc.length;
    const ids = this.Listdathangncc.map(v =>v.idNCC);
    console.log(ids);
    this._nhacungcapsService.Findlistid(ids).then((data:any)=>{
      if(data){this.ListNhacungcap = data} 
    })
    console.log(this.Listdathangncc);
    this.initializeColumns();
    this.setupDataSource();
    this.setupDrawer();
  }
  GetNhacungcap(id: any): any {
    return this.ListNhacungcap.find((v) => v.id === id);
  }
  private initializeColumns(): void {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true,
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem(
        'dathangncc_FilterColumns',
        JSON.stringify(this.FilterColumns)
      );
    }

    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.Listdathangncc);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = 'side';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    this.setupDataSource();
    localStorage.setItem(
      'dathangncc_FilterColumns',
      JSON.stringify(this.FilterColumns)
    );
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/dathangncc', 0]);
  }

  goToDetail(item: any): void {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(['admin/dathangncc', item.id]);
  }
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'Khachhangimport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    // const result: any = await this._DonhangsService.getDrive(DriveInfo);
    // const data = ConvertDriveData(result.values);
    // console.log(data);
    // const updatePromises = data.map(async (v: any) => {
    //   const item = this._KhachhangsService
    //     .ListKhachhang()
    //     .find((v1) => v1.MaKH === v.MaKH);
    //   if (item) {
    //     const item1 = { ...item, ...v };
    //     console.log(item1);

    //     await this._KhachhangsService.updateOneKhachhang(item1);
    //   }
    // });
    // Promise.all(updatePromises).then(() => {
    //   this._snackBar.open('Cập Nhật Thành Công', '', {
    //     duration: 1000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     panelClass: ['snackbar-success'],
    //   });
    //   //  window.location.reload();
    // });
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
      // const transformedData = jsonData.map((v: any) => ({
      //   Title: v.Title.trim(),
      //   MaSP: v.MaSP.trim(),
      //   giagoc: Number(v.giagoc),
      //   dvt: v.dvt,
      // }));
      // const updatePromises = jsonData.map(async (v: any) => {
      //   const item = this._KhachhangsService
      //     .ListKhachhang()
      //     .find((v1) => v1.MaKH === v.MaKH);
      //   if (item) {
      //     const item1 = { ...item, ...v };
      //     //await this._KhachhangsService.updateOneKhachhang(item1);
      //   }
      // });
    //   Promise.all(updatePromises).then(() => {
    //     this._snackBar.open('Cập Nhật Thành Công', '', {
    //       duration: 1000,
    //       horizontalPosition: 'end',
    //       verticalPosition: 'top',
    //       panelClass: ['snackbar-success'],
    //     });
    //     window.location.reload();
    //   });
    // };
    // fileReader.readAsArrayBuffer(file);
  }
  }   
  writeExcelFile() {
    // this._KhachhangsService.ListKhachhang();
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    //   this._KhachhangsService.ListKhachhang()
    // );
    // const workbook: XLSX.WorkBook = {
    //   Sheets: { Sheet1: worksheet },
    //   SheetNames: ['Sheet1'],
    // };
    // const excelBuffer: any = XLSX.write(workbook, {
    //   bookType: 'xlsx',
    //   type: 'array',
    // });
    // this.saveAsExcelFile(
    //   excelBuffer,
    //   'danhsachkhachhang_' + moment().format('DD_MM_YYYY')
    // );
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    // const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    // const url: string = window.URL.createObjectURL(data);
    // const link: HTMLAnchorElement = document.createElement('a');
    // link.href = url;
    // link.download = `${fileName}.xlsx`;
    // link.click();
    // window.URL.revokeObjectURL(url);
    // link.remove();
  }
}
