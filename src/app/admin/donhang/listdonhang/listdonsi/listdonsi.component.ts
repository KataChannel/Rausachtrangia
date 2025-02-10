import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import moment from 'moment';
import { DonhangsService } from '../listdonhang.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listdonsi',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './listdonsi.component.html',
  styleUrl: './listdonsi.component.scss'
})
export class ListdonsiComponent {
  // route: ActivatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   const idDonhang = this.route.snapshot.params['id'];
  //   if(idDonhang)
  //   {
  //     console.log(idDonhang);
  //   }
  // }
    Detail:any={}
    dataSource!: MatTableDataSource<any>;
    displayedColumns: string[] = [
      'STT',
      'MaDonHang', 
      'Hoten', 
      'SDT',
      'Diachi',
      'Ghichu',
      'Ngaygiao',
      'CreateAt',
    ];
    ColumnName:any={
      'STT':'STT',
      'MaDonHang':'Mã Đơn Hàng', 
      'Hoten':'Tên Khách Hàng', 
      'SDT':'SDT',
      'Diachi':'Địa Chỉ',
      'Ghichu':'Ghi Chú',
      'Ngaygiao':'Ngày Giao',
      'CreateAt':'Ngày Tạo',
    }
    ListDate:any[]=[
      {id:1,Title:'1 Ngày',value:'day'},
      {id:2,Title:'1 Tuần',value:'week'},
      {id:3,Title:'1 Tháng',value:'month'},
      {id:4,Title:'1 Năm',value:'year'},
    ]
    @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
    _DonhangsService:DonhangsService= inject(DonhangsService)
    ListDonhang = signal<any[]>([]);
    SearchParams: any = {
      Batdau:moment().startOf('day').toDate(),
      Ketthuc: moment().endOf('day').toDate(),
      Type:'donsi',
      pageSize:9999,
      pageNumber:0
    };
    Chonthoigian:any='day'
    constructor(
      private _breakpointObserver: BreakpointObserver,
      private _router: Router,
    ) {}
  
    async ngOnInit(): Promise<void> {
      await this._DonhangsService.SearchDonhang(this.SearchParams)
      this.ListDonhang = this._DonhangsService.ListDonhang
      this.dataSource = new MatTableDataSource(this.ListDonhang().sort((a:any,b:any)=>b.Ordering-a.Ordering)
      // .map((v:any)=>({
      //   id:v?.id,
      //   MaDonHang:v?.MaDonHang,
      //   Diachi:v?.Khachhang?.Diachi,
      //   Hoten:v?.Khachhang?.Hoten,
      //   SDT:v?.Khachhang?.SDT,
      //   Ghichu:v.Ghichu,
      //   CreateAt:moment(v.CreateAt).format('HH:mm:ss DD/MM/YYYY'),
      // }))
    
    ); 
      // console.log(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
        if (result.matches) {
       //  this.drawer.mode = 'over';
         this.paginator.hidePageSize =true
        } else {
        //  this.drawer.mode = 'over';
        }
      });
      
    }
    ngAfterViewInit() { 
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
        case 'week':
          this.SearchParams.Batdau = moment().startOf('week').toDate()
          this.SearchParams.Ketthuc = moment().endOf('week').toDate() 
          this.ngOnInit()     
          break;
        default:
          this.SearchParams.Batdau = moment().startOf('day').toDate()
          this.SearchParams.Ketthuc = moment().endOf('day').toDate() 
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
}
