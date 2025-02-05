import { Component, inject, ViewChild } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { ListBanggiaComponent } from '../listbanggia.component';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Router, RouterLink } from '@angular/router';
  import { Forms, ListBanggia } from '../listbanggia';
import { BanggiasService } from '../listbanggia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { SanphamsService } from '../../../sanpham/listsanpham/listsanpham.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDateRangeInput } from '@angular/material/datepicker';
import moment from 'moment';
import { CommonModule } from '@angular/common';
  @Component({
    selector: 'app-detailbanggia',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      FormsModule,
      MatDatepickerModule,
      CommonModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './detailbanggia.component.html',
    styleUrl: './detailbanggia.component.scss'
  })
  export class DetailBanggiaComponent {
    _ListbanggiaComponent:ListBanggiaComponent = inject(ListBanggiaComponent)
    _BanggiasService:BanggiasService = inject(BanggiasService)
    _SanphamsService:SanphamsService = inject(SanphamsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _Router: Router = inject(Router)
    _snackBar: MatSnackBar = inject(MatSnackBar)
    constructor() {}
    Detail:any={Type:'bansi',ListSP:[],
      Batdau:moment().startOf('day').toDate(),
      Ketthuc:moment().startOf('day').toDate(),
    }
    isEdit:boolean=false
    isDelete:boolean=false
    idBanggia:any
    ListSanpham:any[]=[]
    dataSource!: MatTableDataSource<any>;
    displayedColumns: string[] = ['id','STT','MaSP','Title', 'giagoc', 'giaban'];
    ColumnName: any = { 'id':'ID','STT': 'STT','MaSP':'Mã Sản Phẩm','Title': 'Tên Sản Phẩm', 'giagoc': 'Giá Gốc', 'giaban': 'Giá Bán' };
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idBanggia = data.get('id')
        this.isEdit = this.idBanggia === '0';   
        if (this.idBanggia&&this.idBanggia !== '0') {
          this._ListbanggiaComponent.drawer.open();     
          await this._BanggiasService.getBanggiaByid(this.idBanggia);
          this.Detail = this._BanggiasService.Banggia();
          this.MappingListSanpham();
        } else if(this.idBanggia === '0') {
          this.MappingListSanpham();
          this._ListbanggiaComponent.drawer.open();   
        }
        else {
          this._ListbanggiaComponent.drawer.close();   
        }
      });   
    }
    async MappingListSanpham() {
      await this._SanphamsService.getAllSanpham();
      this.ListSanpham = this._SanphamsService.ListSanpham();
      this.Detail.ListSP = this.ListSanpham.map((item: any) => {
        const existingItem = this.Detail?.ListSP?.find((v: any) => v.id === item.id);
        return {
          id: item.id,
          Title: item.Title,
          MaSP: item.MaSP,
          giagoc: item.Giagoc[0].gia,
          giaban: existingItem && existingItem.giaban > 0 ? existingItem.giaban : item.Giagoc[0].gia,
        };
      });

      this.dataSource = new MatTableDataSource(this.Detail.ListSP);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      this.paginator._intl.previousPageLabel = 'Về Trước';
      this.paginator._intl.firstPageLabel = 'Trang Đầu';
      this.paginator._intl.lastPageLabel = 'Trang Cuối';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) { return `0 của ${length}`; }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} của ${length}`;
      };
      console.log(this.Detail.ListSP);
      
    }
    updateGiaBan( item: any,event: any) {
      console.log(item); 
      // item.giaban = event.target.value;
      const index = this.Detail.ListSP.findIndex((v: any) => v.id === item.id);
      this.Detail.ListSP[index] = item;
     }
     ApplyDate()
     {
     //  this.ngOnInit()    
     }
    goBack(){
      window.location.href=`/admin/banggia`;
    }
    SaveData()
    {
      if(this.idBanggia=='0')
      {
        this.Detail.ListSP = this.Detail.ListSP.map((item: any) => ({
          id: item.id,
          giaban: item.giaban,
        }));
        this._BanggiasService.CreateBanggia(this.Detail).then(()=>
          {
            this._snackBar.open('Thêm Mới Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
            window.location.href=`/admin/banggia`;
          })
      }
      else
      {
        this.Detail.ListSP = this.Detail.ListSP.map((item: any) => ({
          id: item.id,
          giaban: item.giaban,
        }));
        this._BanggiasService.updateOneBanggia(this.Detail).then((data:any)=>{
            this._snackBar.open('Cập Nhật Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
          })
      }
      this.isEdit=false  
    }
    DeleteData()
    {
      this._BanggiasService.DeleteBanggia(this.Detail).then((data:any)=>{
        if(data)
          this._snackBar.open('Xóa Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'], 
          });
        }) 
        window.location.href=`/admin/banggia`;
    } 
  }