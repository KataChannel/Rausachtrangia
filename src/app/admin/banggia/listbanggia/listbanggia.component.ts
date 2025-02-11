import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, ListBanggia } from './listbanggia';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BanggiasService } from './listbanggia.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { convertToSlug } from '../../../shared/shared.utils';

@Component({
  selector: 'app-listbanggia',
  templateUrl: './listbanggia.component.html',
  styleUrls: ['./listbanggia.component.scss'],
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
  ],
})
export class ListBanggiaComponent{
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnName: any = { 'STT': 'STT' };
  Forms: any[] = Forms;
  FilterColumns: any[] = JSON.parse(localStorage.getItem('Banggia_FilterColumns') || '[]');
  Columns: any[] = [];
  Listbanggia: any[] = ListBanggia;
  CountItem: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _banggiasService: BanggiasService = inject(BanggiasService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._banggiasService.getAllBanggia();
    this.Listbanggia = this._banggiasService.ListBanggia()||[];
    this.initializeColumns();
    this.setupDataSource();
    this.setupDrawer();
  }

  private initializeColumns(): void {
    this.Columns = Object.keys(ListBanggia[0]).map(key => ({
      key,
      value: ListBanggia[0][key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem('Banggia_FilterColumns', JSON.stringify(this.FilterColumns));
    }

    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);    
  }

  private setupDataSource(): void {
    console.log(this.Listbanggia);
    
    this.dataSource = new MatTableDataSource(this.Listbanggia.map(v =>
      this.FilterColumns.filter(item => item.isShow).reduce((obj, item) => {
        obj[item.key] = v[item.key];
        return obj;
      }, {})
    ));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    this.CountItem = this.dataSource.data.length;    
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
    localStorage.setItem('Banggia_FilterColumns', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter(v => v.value.toLowerCase().includes(query));    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    this.CountItem = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/banggia', 0]);
  }

  
}