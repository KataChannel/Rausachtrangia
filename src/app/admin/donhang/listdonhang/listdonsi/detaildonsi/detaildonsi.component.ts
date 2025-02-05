import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListBanggiaComponent } from '../../../../banggia/listbanggia/listbanggia.component';
import { BanggiasService } from '../../../../banggia/listbanggia/listbanggia.service';
import { SanphamsService } from '../../../../sanpham/listsanpham/listsanpham.service';
import { ListdonhangComponent } from '../../listdonhang.component';
import { DonhangsService } from '../../listdonhang.service';
import { GiohangcommonComponent } from '../../../../giohang/giohangcommon/giohangcommon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detaildonsi',
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
   GiohangcommonComponent,
   MatProgressSpinnerModule
  ],
  templateUrl: './detaildonsi.component.html',
  styleUrl: './detaildonsi.component.scss'
})
export class DetaildonsiComponent {
    _ListdonhangComponent:ListdonhangComponent = inject(ListdonhangComponent)
    _DonhangsService:DonhangsService = inject(DonhangsService)
    _SanphamsService:SanphamsService = inject(SanphamsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _snackBar: MatSnackBar = inject(MatSnackBar)
    constructor() {}
    Detail:any={}
    isEdit:boolean=false
    isDelete:boolean=false
    paramId:any
    ListSanpham:any[]=[]
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.paramId = data.get('id')
        this.isEdit = this.paramId === '0';   
        if (this.paramId&&this.paramId !== '0') {
          this._DonhangsService.getDonhangByid(this.paramId).then((data:any)=>{
            if(data){
              this.Detail = data
              console.log(this.paramId);
              console.log(this.Detail);
              this._ListdonhangComponent.drawer.open();   
            }
            // this._SanphamsService.getAllSanpham().then((data:any)=>{
            //   this.ListSanpham = data
            //   this.Detail.ListSP = this.Detail.ListSP.map((item: any) => {
            //     const sanpham = this.ListSanpham.find((sp: any) => sp.id === item.id);
            //     return {
            //       ...item,
            //       tensp: sanpham.tensp,
            //       hinhanh: sanpham.hinhanh,
            //     };
            //   });
            // })
          })  
        } else if(this.paramId === '0') {
          this._ListdonhangComponent.drawer.open();   
        }
        else {
          this._ListdonhangComponent.drawer.close();   
        }
      });   
    }
    Xoagiohang(){ 
      this.Detail.Giohangs = []
      this._DonhangsService.UpdateDonhang(this.Detail)
      location.reload()
    }
    Tongcong:any=0
    Tong:any=0
    Tinhtongcong(value:any){      
      this.Tongcong = value.Tongcong
      this.Tong = value.Tong
    }
    GetGiohangsEmit(value:any){ 
      this.Detail.Giohangs = value
      this._DonhangsService.updateOneDonhang(this.Detail)
    }
    goBack(){
      window.location.href=`/admin/donhang`;
    }
    SaveData()
    {
      if(this.paramId=='0')
      {
        this.Detail.ListSP = this.Detail.ListSP.map((item: any) => ({
          id: item.id,
          giaban: item.giaban,
        }));
        this._DonhangsService.createDonhang(this.Detail).then(()=>
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
        this._DonhangsService.updateOneDonhang(this.Detail).then((data:any)=>{
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
      this._DonhangsService.DeleteDonhang(this.Detail).then((data:any)=>{
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
