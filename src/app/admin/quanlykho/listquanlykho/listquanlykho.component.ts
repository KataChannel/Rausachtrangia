import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
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
import { QuanlykhosService } from './listquanlykho.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listquanlykho',
  templateUrl: './listquanlykho.component.html',
  styleUrls: ['./listquanlykho.component.scss'],
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
    CommonModule
  ],
})
export class ListQuanlykhoComponent {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['STT','MaKho','Title','Diachi','SDT','Ghichu'];
  ColumnName: any = { 'STT': 'STT',
    'MaKho': 'Mã kho',
    'Title': 'Tên kho',
    'Diachi': 'Địa chỉ',
    'SDT': 'Số điện thoại',
    'Ghichu': 'Ghi chú'
   };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('quanlykho_FilterColumns') || '[]');
  Columns: any[] = [];
  Listquanlykho: any[] = [];
  CountItem: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  private _quanlykhosService: QuanlykhosService = inject(QuanlykhosService);
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}
  async ngOnInit(): Promise<void> {
    await this._quanlykhosService.getAllQuanlykho();
    this.Listquanlykho = this._quanlykhosService.ListQuanlykho();
    this.CountItem = this.Listquanlykho.length;
    console.log(this._quanlykhosService.ListQuanlykho());
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
      localStorage.setItem('quanlykho_FilterColumns', JSON.stringify(this.FilterColumns));
    }

    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.Listquanlykho);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    
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
    localStorage.setItem('quanlykho_FilterColumns', JSON.stringify(this.FilterColumns));
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
    this._router.navigate(['admin/quanlykho', 0]);
  }

  goToDetail(item: any): void {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(['admin/quanlykho', item.id]);
  }
}