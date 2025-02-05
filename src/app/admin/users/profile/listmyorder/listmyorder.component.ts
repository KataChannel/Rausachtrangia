import {
  AfterViewInit,
  Component,
  inject,
  viewChild,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListMyorder } from './listmyorder';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailMyorderComponent } from './detailmyorder/detailmyorder.component';
import { DonhangsService } from '../../../donhang/listdonhang/listdonhang.service';
import { UsersService } from '../../auth/users.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import moment from 'moment';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ListHinhthucthanhtoan, ListTrangThaiDonhang } from '../../../../shared/shared.utils';
@Component({
  selector: 'app-listmyorder',
  templateUrl: './listmyorder.component.html',
  styleUrl: './listmyorder.component.scss',
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
  ],
  providers: [provideNativeDateAdapter()],
})
export class ListmyorderComponent implements AfterViewInit {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'MaDonHang',
    'Hoten',
    'SDT',
    'Diachi',
    'Hinhthuc',
    'Ghichu',
    'CreateAt',
    'Status',
  ];
  ColumnName: any = {
    STT: 'STT',
    MaDonHang: 'Mã Đơn Hàng',
    Hoten: 'Họ Tên',
    SDT: 'SDT',
    Diachi: 'Địa Chỉ',
    Hinhthuc: 'Hình Thức TT',
    Ghichu: 'Ghi Chú',
    Status: 'Trạng Thái',
    CreateAt: 'Ngày Tạo',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  _UsersService: UsersService = inject(UsersService);
  _DonhangsService: DonhangsService = inject(DonhangsService);
  User: any = {};
  SearchParams: any = {
    Batdau: moment().startOf('week').toDate(),
    Ketthuc: moment().endOf('week').toDate(),
    pageSize: 9999,
    pageNumber: 0,
  };
  Chonthoigian: any = 'week';
  ListDate: any[] = [
    { id: 1, Title: '1 Tuần', value: 'week' },
    { id: 2, Title: '1 Tháng', value: 'month' },
    { id: 3, Title: '1 Năm', value: 'year' },
  ];
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {}

  ngOnInit(): void {
this._UsersService.getProfile().then((data) => {
      if (data) {
        this.User = data;
        console.log(data);
        this._DonhangsService.getDonhangByidUser(data.id).then((data1) => {
          console.log(data1);
          this.dataSource = new MatTableDataSource(data1
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
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });


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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    this.paginator.pageSize = 30;
  }
  CoppyDon(item:any)
  {
    this._DonhangsService.getDonhangByid(item.id).then((data:any)=>{
      console.log(data);
      
      if(data)
      {
        delete data.id;
        this._DonhangsService.UpdateDonhang(data).then(()=>{
          setTimeout(() => {
            // this._router.navigate(['don-hang']); 
           window.location.href = `don-hang`;
          }, 0);
        })
      }
    })
  }
  onSelectionChange(event: MatSelectChange) {
    switch (event.value) {
      case 'month':
        this.SearchParams.Batdau = moment().startOf('month').toDate();
        this.SearchParams.Ketthuc = moment().endOf('month').toDate();
        this.ngOnInit();
        break;
      case 'year':
        this.SearchParams.Batdau = moment().startOf('year').toDate();
        this.SearchParams.Ketthuc = moment().endOf('year').toDate();
        this.ngOnInit();
        break;
      default:
        this.SearchParams.Batdau = moment().startOf('week').toDate();
        this.SearchParams.Ketthuc = moment().endOf('week').toDate();
        this.ngOnInit();
        break;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Create() {
    // this.drawer.open();
    // this._router.navigate(['admin/myorders', 0])
  }
  ApplyDate() {
    this.ngOnInit();
  }
  goToDetail(item: any) {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(['myorder', item.id]);
  }
}
