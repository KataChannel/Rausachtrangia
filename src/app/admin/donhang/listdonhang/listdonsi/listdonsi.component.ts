import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { DonhangsService } from '../listdonhang.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listdonsi',
  templateUrl: './listdonsi.component.html',
  styleUrls: ['./listdonsi.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    RouterLink
  ]
})
export class ListdonsiComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT', 'MaDonHang', 'TenKH', 'SDT', 'Diachi', 'Ghichu', 'Ngaygiao', 'CreateAt'
  ];
  ColumnName: Record<string, string> = {
    'STT': 'STT',
    'MaDonHang': 'Mã Đơn Hàng',
    'TenKH': 'Tên Khách Hàng',
    'SDT': 'SDT',
    'Diachi': 'Địa Chỉ',
    'Ghichu': 'Ghi Chú',
    'Ngaygiao': 'Ngày Giao',
    'CreateAt': 'Ngày Tạo'
  };
  listDate: Array<{ id: number, title: string, value: string }> = [
    { id: 1, title: '1 Ngày', value: 'day' },
    { id: 2, title: '1 Tuần', value: 'week' },
    { id: 3, title: '1 Tháng', value: 'month' },
    { id: 4, title: '1 Năm', value: 'year' }
  ];
  searchParams: any = {
    Batdau: moment().startOf('day').toDate(),
    Ketthuc: moment().endOf('day').toDate(),
    Type: 'donsi',
    pageSize: 9999,
    pageNumber: 0
  };
  selectedTimePeriod: string = 'day';
  @Input() listDonhang = signal<any[]>([]);
  detail: any = {};

  private donhangsService: DonhangsService = inject(DonhangsService);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadDonhangs();
    this.observeBreakpoints();
  }

  private async loadDonhangs(): Promise<void> {
    await this.donhangsService.SearchDonhang(this.searchParams);
    this.listDonhang = this.donhangsService.ListDonhang;
    this.dataSource = new MatTableDataSource(this.listDonhang().sort((a, b) => b.Ordering - a.Ordering));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    console.log(this.listDonhang());
    
  }

  private observeBreakpoints(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.paginator.hidePageSize = true;
      }
    });
  }

  onSelectionChange(event: MatSelectChange): void {
    const timePeriod = event.value;
    this.updateSearchParams(timePeriod);
    this.loadDonhangs();
  }

  private updateSearchParams(timePeriod: string): void {
    switch (timePeriod) {
      case 'month':
        this.searchParams.Batdau = moment().startOf('month').toDate();
        this.searchParams.Ketthuc = moment().endOf('month').toDate();
        break;
      case 'year':
        this.searchParams.Batdau = moment().startOf('year').toDate();
        this.searchParams.Ketthuc = moment().endOf('year').toDate();
        break;
      case 'week':
        this.searchParams.Batdau = moment().startOf('week').toDate();
        this.searchParams.Ketthuc = moment().endOf('week').toDate();
        break;
      default:
        this.searchParams.Batdau = moment().startOf('day').toDate();
        this.searchParams.Ketthuc = moment().endOf('day').toDate();
        break;
    }
  }

  applyDate(): void {
    this.loadDonhangs();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
