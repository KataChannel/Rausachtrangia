import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../auth/users.service';
import { CommonModule } from '@angular/common';
import { GiohangService } from '../../../main-admin/website/giohang/giohang.service';
import { DonhangsService } from '../../../donhang/listdonhang/listdonhang.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListDonhang } from '../../../donhang/listdonhang/listdonhang';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-myorder',
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.scss'
})
export class MyorderComponent implements OnInit {
  User: any = {}
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
 _UsersService: UsersService = inject(UsersService);
 _DonhangsService: DonhangsService = inject(DonhangsService);
  constructor(private _snackBar: MatSnackBar) {
      this._UsersService.getProfile()
      this._UsersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data
          this._DonhangsService.getDonhangByidUser(data.id).then((data1)=>{
            console.log(data1);
          })
         // console.log(this.User); 
        }
      })
    }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(ListDonhang); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  goToDetail(item:any)
  {
    // this.drawer.open();
    // this.Detail=item
    // this._router.navigate(['admin/donhangs', item.id])  
  }
  CheckNoti()
  {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
  }
  GetUpload(e:any)
  {
    console.log(e.src);
    
    this.User.Image.Main = e.src
    this._UsersService.UpdateUser(this.User).then(()=>{
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    });;
  }
  UpdateProfile()
  {
    this._UsersService.UpdateUser(this.User).then(()=>{
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    });
  }
}
