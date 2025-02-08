import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, ListSanpham } from './listsanpham';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SanphamsService } from './listsanpham.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { convertToSlug } from '../../../shared/shared.utils';

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
  displayedColumns: string[] = ['STT','Title', 'giagoc', 'dvt', 'Actions'];
  ColumnName: any = {'STT':'STT','Title': 'Tên Sản Phẩm', 'giagoc': 'Giá Gốc', 'dvt': 'Đơn Vị Tính' };
  Forms: any[] = Forms;
  FilterColumns: any[] = JSON.parse(localStorage.getItem('Sanpham_FilterColumns') || '[]');
  Columns: any[] = [];
  ListSanpham: any[] = ListSanpham;
  CountItem: number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _SanphamsService: SanphamsService = inject(SanphamsService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
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
    console.log(this.ListSanpham);
    
    this.ListSanpham.forEach((v:any) => {
      v.giagoc = v.Giagoc[0].gia;
      v.dvt = v.Giagoc[0].dvt;
    });
    // console.log(this._SanphamsService.ListSanpham());
    this.setupDataSource();
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
    console.log(this.dataSource);
    this.CountItem = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/sanphams', 0]);
  }

  goToDetail(item: any): void {
    console.log(item);
    
    this.drawer.open();
   // this.Detail = item;
    // this._router.navigate(['admin/sanphams', item.id]);
  }
}