import {
  AfterViewInit,
  Component,
  inject,
  ViewChild,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DonhangsService } from './listdonhang.service';
import moment from 'moment';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ConvertDriveData } from '../../../shared/shared.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-listdonhang',
  templateUrl: './listdonhang.component.html',
  styleUrls: ['./listdonhang.component.scss'],
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
    FormsModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListdonhangComponent {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'MaDonHang',
    'TenKH',
    'SDT',
    'Diachi',
    'Ghichu',
    'Ngaygiao',
    'Status',
  ];
  ColumnName: any = {
    STT: 'STT',
    MaDonHang: 'Mã Đơn Hàng',
    TenKH: 'Tên Khách Hàng',
    SDT: 'SDT',
    Diachi: 'Địa Chỉ',
    Ghichu: 'Ghi Chú',
    Status: 'Trạng Thái',
    Ngaygiao: 'Ngày Giao',
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('ListDonhang_FilterColumns') || '[]'
  );
  private _DonhangsService: DonhangsService = inject(DonhangsService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListDonhang = signal<any[]>([]);
  SearchParams: any = {
    Batdau: moment().format('YYYY-MM-DD'),
    Ketthuc: moment().add(1,'day').format('YYYY-MM-DD'),
    Type: 'donsi',
    pageSize: 9999,
    pageNumber: 0,
  };
  Chonthoigian: any = 'day';
  Columns: any[] = [];
  CountItem: number = 0;
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.setupBreakpointObserver();
    this.initializeColumns();
  }
  ApplyDate(): void {
    this.loadData();
  }
  onBatdauChange(event: any): void {
    console.log(this.SearchParams);
    
    if(event.value){
      this.loadData();
    }
  }
  onKetthucChange(event: any): void {
    if(event.value){
      this.loadData();
    }
  }
  private async loadData(): Promise<void> {
    this.SearchParams.Batdau = moment(this.SearchParams.Batdau).format('YYYY-MM-DD');
    this.SearchParams.Ketthuc = moment(this.SearchParams.Ketthuc).format('YYYY-MM-DD');
    await this._DonhangsService.SearchDonhang(this.SearchParams);
    this.ListDonhang = this._DonhangsService.ListDonhang;
    this.dataSource = new MatTableDataSource(
      this.ListDonhang().sort((a: any, b: any) => b.Ordering - a.Ordering)
    );
    this.CountItem = this.dataSource.data.length;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      this.paginator._intl.previousPageLabel = 'Về Trước';
      this.paginator._intl.firstPageLabel = 'Trang Đầu';
      this.paginator._intl.lastPageLabel = 'Trang Cuối';
    }
  }

  private setupBreakpointObserver(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = 'over';
        }
      });
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
        'Vandon_FilterColumns',
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

  onSelectionChange(event: MatSelectChange): void {
    const timeFrames: { [key: string]: () => void } = {
      day: () => {
        this.SearchParams.Batdau = moment().startOf('day').format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('day').add(1,'day').format('YYYY-MM-DD');
      },
      week: () => {
        this.SearchParams.Batdau = moment().startOf('week').format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('week').format('YYYY-MM-DD');
      },
      month: () => {
        this.SearchParams.Batdau = moment().startOf('month').format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('month').format('YYYY-MM-DD');
      },
      year: () => {
        this.SearchParams.Batdau = moment().startOf('year').format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('year').format('YYYY-MM-DD');
      },
    };

    timeFrames[event.value]?.();
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.CountItem = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Create(): void {
    this.drawer.open();
    this._router.navigate(['admin/donhang/donsi', 0]);
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
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
      'Vandon_FilterColumns',
      JSON.stringify(this.FilterColumns)
    );
  }
  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.ListDonhang());
    this.CountItem = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }
  
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'Khachhangimport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    const result: any = await this._DonhangsService.getDrive(DriveInfo);
    const data = ConvertDriveData(result.values);
    console.log(data);
    const updatePromises = data.map(async (v: any) => {
      const item = this._DonhangsService.ListDonhang().find((v1) => v1.MaKH === v.MaKH);
      if (item) {
        const item1 = { ...item, ...v };
        console.log(item1);
      }
    });
    Promise.all(updatePromises).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
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
      // const transformedData = jsonData.map((v: any) => ({
      //   Title: v.Title.trim(),
      //   MaSP: v.MaSP.trim(),
      //   giagoc: Number(v.giagoc),
      //   dvt: v.dvt,
      // }));
      const updatePromises = jsonData.map(async (v: any) => {
      const item = this._DonhangsService.ListDonhang().find((v1) => v1.MaKH === v.MaKH);
        if (item) {
          const item1 = { ...item, ...v };
          console.log(item1);
        }
      });
      Promise.all(updatePromises).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        window.location.reload();
      });
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    this._DonhangsService.ListDonhang();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this._DonhangsService.ListDonhang()
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(
      excelBuffer,
      'danhsachdonhang_' + moment().format('DD_MM_YYYY')
    );
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
