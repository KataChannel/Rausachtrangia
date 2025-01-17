import {AfterViewInit, Component, inject, signal, viewChild, ViewChild,ChangeDetectionStrategy} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DonhangsService } from './listdonhang.service';
import moment from 'moment';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ListHinhthucthanhtoan, ListTrangThaiDonhang } from '../../../shared/shared.utils';
@Component({
  selector: 'app-listdonhang',
  templateUrl: './listdonhang.component.html',
  styleUrl: './listdonhang.component.scss',
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
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListdonhangComponent implements AfterViewInit {
  Detail:any={}
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'MaDonHang', 
    'Hoten', 
    'SDT',
    'Diachi',
    'Thanhtoan',
    'Ghichu',
    'CreateAt',
    'Status',
  ];
  ColumnName:any={
    'STT':'STT',
    'MaDonHang':'Mã Đơn Hàng', 
    'Hoten':'Họ Tên', 
    'SDT':'SDT',
    'Diachi':'Địa Chỉ',
    'Thanhtoan':'Hình Thức TT',
    'Ghichu':'Ghi Chú',
    'Status':'Trạng Thái',
    'CreateAt':'Ngày Tạo',
  }
  ListDate:any[]=[
    {id:1,Title:'1 Tuần',value:'week'},
    {id:2,Title:'1 Tháng',value:'month'},
    {id:3,Title:'1 Năm',value:'year'},
  ]
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  _DonhangsService:DonhangsService= inject(DonhangsService)
  ListDonhang = signal<any[]>([]);
  SearchParams: any = {
    Batdau:moment().startOf('week').toDate(),
    Ketthuc: moment().endOf('week').toDate(),
    pageSize:9999,
    pageNumber:0
  };
  Chonthoigian:any='week'
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._DonhangsService.SearchDonhang(this.SearchParams)
    this.ListDonhang = this._DonhangsService.ListDonhang
    this.dataSource = new MatTableDataSource(this.ListDonhang()
    .map((v:any)=>({
      id:v?.id,
      MaDonHang:v?.MaDonHang,
      Diachi:v?.Khachhang?.Diachi,
      Hoten:v?.Khachhang?.Hoten,
      SDT:v?.Khachhang?.SDT,
      Ghichu:v.Ghichu,
      CreateAt:moment(v.CreateAt).format('HH:ss:mm DD/MM/YYYY'),
      Status:`<span class="${ListTrangThaiDonhang.find((v1)=>v1.id==v.Status)?.Class} p-2 rounded-lg">${ListTrangThaiDonhang.find((v1)=>v1.id==v.Status)?.Title}</span>`,
      Thanhtoan:`<span class="${ListHinhthucthanhtoan.find((v1)=>v1.id==v?.Thanhtoan?.Hinhthuc)?.Class} p-2 rounded-lg">${ListHinhthucthanhtoan.find((v1)=>v1.id==v?.Thanhtoan?.Hinhthuc)?.Title}</span>`,
    }))
  
  ); 
    console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Detail.id?this.drawer.open():this.drawer.close()
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
       this.drawer.mode = 'over';
       this.paginator.hidePageSize =true
      } else {
        this.drawer.mode = 'over';
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
  onSelectionChange(event: MatSelectChange) {
    switch (event.value) {
      case 'month':
        this.SearchParams.Batdau = moment().startOf('month').toDate()
        this.SearchParams.Ketthuc = moment().endOf('month').toDate()    
        this.ngOnInit()
        break;
      case 'year':
        this.SearchParams.Batdau = moment().startOf('year').toDate()
        this.SearchParams.Ketthuc = moment().endOf('year').toDate()   
        this.ngOnInit()    
        break;
      default:
        this.SearchParams.Batdau = moment().startOf('week').toDate()
        this.SearchParams.Ketthuc = moment().endOf('week').toDate() 
        this.ngOnInit()      
        break;
    }
  }
  ApplyDate()
  {
    this.ngOnInit()    
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
    this._router.navigate(['admin/donhang', 0])
  }
  goToDetail(item:any)
  {
    this.drawer.open();
    this.Detail=item
    this._router.navigate(['admin/donhang', item.id])  
  }
}
