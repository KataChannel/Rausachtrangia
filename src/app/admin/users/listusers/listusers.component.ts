import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, ListUsers } from './listusers';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserssService } from './listusers.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listusers',
  standalone: true,
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss'],
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
export class ListUsersComponent implements AfterViewInit {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['STT','Hoten', 'email', 'SDT', 'Ngaysinh', 'Gioitinh', 'Role', 'Status'];
  ColumnName: any = { 
    'STT': 'STT',
    'Hoten': 'Họ Tên',
    'email': 'Email',
    'SDT': 'Số Điện Thoại',
    'Ngaysinh': 'Ngày Sinh',
    'Gioitinh': 'Giới Tính',
    'Role': 'Quyền',
    'Status': 'Status'
   };
  Forms: any[] = Forms;
  FilterColumns: any[] = JSON.parse(localStorage.getItem('users_FilterColumns') || '[]');
  Columns: any[] = [];
  Listusers: any[] = ListUsers;
  CountItem: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _userssService: UserssService = inject(UserssService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}
  async ngOnInit(): Promise<void> {
    await this._userssService.getAllUsers();
    this.Listusers = this._userssService.ListUsers();
    console.log(this.Listusers);
    this.initializeColumns();
    this.setupDataSource();
    this.setupDrawer();
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
      localStorage.setItem('users_FilterColumns', JSON.stringify(this.FilterColumns));
    }

    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.Listusers)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupDrawer(): void {

    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = 'side';
      }
    });
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
    localStorage.setItem('users_FilterColumns', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter(v => v.value.toLowerCase().includes(query));    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/users', 0]);
  }
}