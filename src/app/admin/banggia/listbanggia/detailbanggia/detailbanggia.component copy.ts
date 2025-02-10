import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { ConvertDriveData } from '../../../../shared/shared.utils';
import { DonhangsService } from '../../../donhang/listdonhang/listdonhang.service';
import { KhachhangsService } from '../../../khachhang/listkhachhang/listkhachhang.service';
import * as XLSX from 'xlsx';
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
    _DonhangsService:DonhangsService = inject(DonhangsService)
    _KhachhangsService:KhachhangsService = inject(KhachhangsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _Router: Router = inject(Router)
    _snackBar: MatSnackBar = inject(MatSnackBar)
    constructor() {}
    Detail:any= signal<any>({Type:'bansi',ListSP:[],
      Batdau:moment().startOf('day').toDate(),
      Ketthuc:moment().startOf('day').toDate(),
    })
    isEdit:boolean=false
    isDelete:boolean=false
    idBanggia:any
    ListSanpham:any[]=[]
    ListKhachhang:any[]=[]
    CountItem:number=0
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
          this.Detail = this._BanggiasService;
          console.log(this.Detail());
          this._KhachhangsService.getKhachhangByidBanggia(this.idBanggia).then((data:any)=>{
            this.ListKhachhang = data;
          })
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
      this.Detail().ListSP = this.ListSanpham.map((item: any) => {
        const existingItem = this.Detail()?.ListSP?.find((v: any) => v.id === item.id);
        return {
          id: item.id,
          Title: item.Title,
          MaSP: item.MaSP,
          giagoc: item.Giagoc[0].gia,
          giaban: existingItem && existingItem.giaban > 0 ? existingItem.giaban : item.Giagoc[0].gia,
        };
      });

      this.dataSource = new MatTableDataSource(this.Detail().ListSP);
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
      this.CountItem = this.dataSource.data.length;
      
    }
    updateGiaBan( item: any,event: any) {
      console.log(item); 
      // item.giaban = event.target.value;
      const index = this.Detail().ListSP.findIndex((v: any) => v.id === item.id);
      this.Detail().ListSP[index] = item;
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
      if(this.Detail().Title==''||this.Detail().Title==null)
      {
        this._snackBar.open('Vui lòng nhập tiêu đề', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-warning'],
        });
      }
      else
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
    async LoadDrive()
          {
            const DriveInfo ={
              IdSheet:'1actXVZD5yQRh5YcpRIxAB-Wf38PNKSIU0LR1AeyR-6s',
              SheetName:'banggiaimport',
              ApiKey:'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao'
            }
          const result:any =  await this._DonhangsService.getDrive(DriveInfo) 
          console.log(result);
          const data =  ConvertDriveData(result.values);   
          console.log(data);
          data.forEach((v:any)=>{
            v.gia = Number(v.gia),
            v.GiaCoSo = Number(v.GiaCoSo),
            v.khoiluong = Number(v.khoiluong),
            v.Soluong = Number(v.Soluong),
            v.SLTT = Number(v.SLTT),
            v.Tongtien = Number(v.Tongtien),
            v.SLTG = Number(v.SLTG),
            v.TongtienG = Number(v.TongtienG),
            v.SLTN = Number(v.SLTN),
            v.TongtienN = Number(v.TongtienN)
          }) 
          console.log(data);
          this.Detail.ListSP = data;
          this.dataSource = new MatTableDataSource(this.Detail.ListSP);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }


  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      const transformedData = jsonData.map((v:any, k) => ({
        id: v.id,
        Title: v.Title,
        MaSP: v.MaSP,
        giagoc: Number(v.giagoc),
        giaban: Number(v.giaban),
      }));
      console.log(transformedData);
      this.Detail.ListSP = transformedData; 
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Detail.ListSP);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }


  }