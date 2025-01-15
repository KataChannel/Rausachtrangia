import {AfterViewInit, Component, inject, viewChild, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListGiohang } from './listgiohang';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailGiohangComponent } from './detailgiohang/detailgiohang.component';
@Component({
  selector: 'app-listgiohang',
  templateUrl: './listgiohang.component.html',
  styleUrl: './listgiohang.component.scss',
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
  ],
})
export class ListgiohangComponent implements AfterViewInit {
  Detail:any={}
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'email', 
    'Hoten', 
    'SDT',
    'CreateAt',
    'field6',
  ];
  ColumnName:any={
    'STT':'STT',
    'Hoten':'Họ Tên', 
    'email':'Email', 
    'SDT':'SDT',
    'CreateAt':'Ngày Tạo',
    'field6':'Hành Động',
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ListGiohang); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Detail.id?this.drawer.open():this.drawer.close()
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
       this.drawer.mode = 'over';
       this.paginator.hidePageSize =true
      } else {
        this.drawer.mode = 'side';
      }
    });
    
  }
  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    this.paginator.pageSize = 30
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Create()
  {
    this.drawer.open();
    this._router.navigate(['admin/giohangs', 0])
  }
  goToDetail(item:any)
  {
    this.drawer.open();
    this.Detail=item
    this._router.navigate(['admin/giohangs', item.id])  }
}
