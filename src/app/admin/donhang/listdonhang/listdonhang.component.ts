import { AfterViewInit, Component, inject, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';
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
import { ListHinhthucthanhtoan, ListTrangThaiDonhang } from '../../../shared/shared.utils';
import { ListdonleComponent } from './listdonle/listdonle.component';
import { ListdonsiComponent } from './listdonsi/listdonsi.component';
import { CommonModule } from '@angular/common';

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
    ListdonleComponent,
    // ListdonsiComponent,
    RouterLink,
    CommonModule
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
    'STT': 'STT',
    'MaDonHang': 'Mã Đơn Hàng',
    'TenKH': 'Tên Khách Hàng',
    'SDT': 'SDT',
    'Diachi': 'Địa Chỉ',
    'Ghichu': 'Ghi Chú',
    'Status': 'Trạng Thái',
    'Ngaygiao': 'Ngày Giao',
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
  private _DonhangsService: DonhangsService = inject(DonhangsService);
  ListDonhang = signal<any[]>([]);
  SearchParams: any = {
    Batdau: moment().startOf('day').toDate(),
    Ketthuc: moment().endOf('day').toDate(),
    Type: 'donsi',
    pageSize: 9999,
    pageNumber: 0
  };
  Chonthoigian: any = 'day';

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.setupBreakpointObserver();
  }
  ApplyDate(): void {
    this.loadData();
  }
  private async loadData(): Promise<void> {
    await this._DonhangsService.SearchDonhang(this.SearchParams);
    this.ListDonhang = this._DonhangsService.ListDonhang;
    this.dataSource = new MatTableDataSource(this.ListDonhang().sort((a: any, b: any) => b.Ordering - a.Ordering));
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
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = 'over';
      }
    });
  }

  onSelectionChange(event: MatSelectChange): void {
    const timeFrames: { [key: string]: () => void } = {
      'day': () => {
        this.SearchParams.Batdau = moment().startOf('day').toDate();
        this.SearchParams.Ketthuc = moment().endOf('day').toDate();
      },
      'week': () => {
        this.SearchParams.Batdau = moment().startOf('week').toDate();
        this.SearchParams.Ketthuc = moment().endOf('week').toDate();
      },
      'month': () => {
        this.SearchParams.Batdau = moment().startOf('month').toDate();
        this.SearchParams.Ketthuc = moment().endOf('month').toDate();
      },
      'year': () => {
        this.SearchParams.Batdau = moment().startOf('year').toDate();
        this.SearchParams.Ketthuc = moment().endOf('year').toDate();
      }
    };

    timeFrames[event.value]?.();
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Create(): void {
    this.drawer.open();
    this._router.navigate(['admin/donhang/donsi', 0]);
  }
}
