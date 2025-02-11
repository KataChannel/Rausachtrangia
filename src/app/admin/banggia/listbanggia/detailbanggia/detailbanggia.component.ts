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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
      CommonModule,
      MatProgressSpinnerModule
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
    displayedColumns: string[] = ['id','STT','MaSP','Title','dvt', 'giagoc', 'giaban'];
    ColumnName: any = { 'id':'ID','STT': 'STT','MaSP':'Mã Sản Phẩm','Title': 'Tên Sản Phẩm','dvt': 'Đơn Vị Tính', 'giagoc': 'Giá Gốc', 'giaban': 'Giá Bán' };
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idBanggia = data.get('id')
        this.isEdit = this.idBanggia === '0';   
        if (this.idBanggia&&this.idBanggia !== '0') {
          this._ListbanggiaComponent.drawer.open();     
          await this._BanggiasService.getBanggiaByid(this.idBanggia).then((data:any)=>{ 
            if(data){
              this.Detail = this._BanggiasService.Banggia;
              console.log(this.Detail());
              this._KhachhangsService.getKhachhangByidBanggia(this.idBanggia).then((data:any)=>{
                this.ListKhachhang = data;
              })
              this.MappingListSanpham();
            }

          })

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
          giagoc: item.giagoc,
          dvt: item.dvt,
          giaban: existingItem && existingItem.giaban > 0 ? existingItem.giaban : item.giagoc,
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
            this.Detail().ListSP = this.Detail().ListSP.map((item: any) => ({
              id: item.id,
              giaban: item.giaban,
            }));
            this._BanggiasService.CreateBanggia(this.Detail()).then(()=>
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
            this.Detail().ListSP = this.Detail().ListSP.map((item: any) => ({
              id: item.id,
              giaban: item.giaban,
            }));
            this._BanggiasService.updateOneBanggia(this.Detail()).then((data:any)=>{
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
    CoppyBanggia()
    {
      this._snackBar.open('Đang Coppy', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning'], 
      });
      this.Detail().ListSP = this.Detail().ListSP.map((item: any) => ({
        id: item.id,
        giaban: item.giaban,
      }));
      delete this.Detail().id
      this.Detail().Title = this.Detail().Title + ' - Coppy';
      this._BanggiasService.CreateBanggia(this.Detail()).then((data:any)=>{        
        if(data)
        {
          setTimeout(() => {
            window.location.href = `admin/banggia/${data.id}`;
           }, 1000);
        }
      })
    }
    DeleteData()
    {
      this._BanggiasService.DeleteBanggia(this.Detail()).then((data:any)=>{
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

    async LoadDrive() {
      this.isLoading = true; // Hiển thị progress bar
      this._snackBar.open('Đang Tải', '', {
      duration: 1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar-warning'],
      });
      const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'banggiaimport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao'
      }
      const result: any = await this._DonhangsService.getDrive(DriveInfo)
      const data = ConvertDriveData(result.values);
      const transformedData = data.map((v: any) => ({
      MaSP: v.MaSP.trim(),
      giaban: Number(v.giaban),
      }));
      console.log(transformedData);

      if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../../workers/excel-worker.ts', import.meta.url), { type: 'module' });

      worker.postMessage({
        sanphams: this._SanphamsService.ListSanpham(),
        transformedData: transformedData
      });

      worker.onmessage = ({ data }) => {
        if (data.status === 'success') {
        this.Detail().ListSP = data.updatedSanphams;
        this.dataSource = new MatTableDataSource(data.updatedSanphams);
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
        } else {
        this._snackBar.open('Lỗi cập nhật: ' + data.message, '', { duration: 3000, panelClass: ['snackbar-error'] });
        }
        this.isLoading = false; // Ẩn progress bar
        worker.terminate();
      };
      } else {
      this._snackBar.open('Trình duyệt không hỗ trợ Web Worker!', '', { duration: 3000, panelClass: ['snackbar-error'] });
      this.isLoading = false; // Ẩn progress bar
      }
    }



  isLoading = false;
  readExcelFile(event: any) {
    
    const file = event.target.files[0];
    if (!file) return;
    this.isLoading = true; // Hiển thị progress bar

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);

      // Kiểm tra trình duyệt có hỗ trợ Web Worker không
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(new URL('../../workers/excel-worker.ts', import.meta.url), { type: 'module' });

        worker.postMessage(data); // Gửi dữ liệu file vào Worker

        worker.onmessage = ({ data }) => {
          if (data.status === 'success') {
            this.processData(data.data); // Xử lý dữ liệu nhận từ Worker
          } else {
            this._snackBar.open('Lỗi đọc file: ' + data.message, '', { duration: 3000, panelClass: ['snackbar-error'] });
          }
          this.isLoading = false; // Ẩn progress bar
          worker.terminate(); // Kết thúc Worker sau khi xong
        };
      } else {
        this._snackBar.open('Trình duyệt không hỗ trợ Web Worker!', '', { duration: 3000, panelClass: ['snackbar-error'] });
        this.isLoading = false;
      }
    };
    fileReader.readAsArrayBuffer(file);
  }
  processData(jsonData: any[]) {
    // Chuyển đổi dữ liệu Excel thành định dạng cần thiết
    const transformedData = jsonData.map((v: any) => ({
      MaSP: v.MaSP.trim(),
      giaban: Number(v.giaban),
    }));
    const updatePromises = this._SanphamsService.ListSanpham().map(v => {
      const match = transformedData.find((v1:any) => v1.MaSP === v.MaSP);
      return match ? { ...v, ...match } : v;
      });
      this.Detail().ListSP = updatePromises; 
    this.dataSource = new MatTableDataSource(transformedData);
    this._snackBar.open('Upload Thành Công!', '', { duration: 2000, panelClass: ['snackbar-success'] });
  }

  writeExcelFile() {
    const data = this.Detail().ListSP.map((v: any) => ({
      MaSP: v.MaSP,
      giaban: v.giaban,
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'banggia_'+ moment().format("DD_MM_YYYY"));
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