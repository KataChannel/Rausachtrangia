import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Forms, ListXuatnhapton } from '../listxuatnhapton';
import { ListXuatnhaptonComponent } from '../listxuatnhapton.component';
import { SanphamsService } from '../../../sanpham/listsanpham/listsanpham.service';
import { XuatnhaptonsService } from '../listxuatnhapton.service';
import { GenId } from '../../../../shared/shared.utils';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DonnccsService } from '../../../dathangncc/listdathangncc/listdathangncc.service';
import { DonhangsService } from '../../../donhang/listdonhang/listdonhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
  @Component({
    selector: 'app-detailxuatnhapton',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      CommonModule,
      MatSelectModule
    ],
    templateUrl: './detailxuatnhapton.component.html',
    styleUrl: './detailxuatnhapton.component.scss'
  })
  export class DetailXuatnhaptonComponent {
    _ListxuatnhaptonComponent:ListXuatnhaptonComponent = inject(ListXuatnhaptonComponent)
    _SanphamService:SanphamsService = inject(SanphamsService)
    _XuatnhaptonsService:XuatnhaptonsService = inject(XuatnhaptonsService)
    _DonnccsService:DonnccsService = inject(DonnccsService)
    _DonhangsService:DonhangsService = inject(DonhangsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={Sanpham:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idXuatnhapton:any
    FilterDonncc:any[]=[]
    ListDonncc:any[]=[]
    FilterDonHang:any[]=[]
    ListDonHang:any[]=[]
    FilterSanpham:any[]=[]
    ListSanpham:any[]=[]
    ListType:any[]=[
      {id:1,Title:'Nhập',value:"NHAP"},
      {id:2,Title:'Xuất',value:"XUAT"},
      {id:3,Title:'Điều Chỉnh',value:"DIEUCHINH"},
      {id:4,Title:'Chuyển Kho',value:"CHUYENKHO"}
    ]
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idXuatnhapton = data.get('id')
        this.isEdit = this.idXuatnhapton === '0';   
        if(!this.idXuatnhapton){
          this._route.navigate(['/admin/xuatnhapton'])
        }
        else{
          this._ListxuatnhaptonComponent.drawer.open();
          this._DonnccsService.getAllDonncc().then((data:any)=>{
            this.FilterDonncc = this.ListDonncc = data
          })
          this._DonhangsService.getAllDonhang().then((data:any)=>{
            this.FilterDonHang = this.ListDonHang = data
          })
          this._SanphamService.getAllSanpham().then((data:any)=>{
            this.FilterSanpham = this.ListSanpham = data
          })
          if(this.idXuatnhapton !== '0'){
            this._XuatnhaptonsService.getXuatnhaptonByid(this.idXuatnhapton).then((data:any)=>{
              if(data){
                this.Detail = data
                // this.Detail.Nhacungcap = this.ListNhacungcap.find(v => v.id === this.Detail.idNCC)
                console.log(data);
                
              }
            })
          } else {
            this.Detail={Sanpham:[]}
            this.Detail.MaPhieu = GenId(8,false) 
          }
        }
      });  
    }
    DoFindSanpham(event:any){
      const query = event.target.value.toLowerCase();
      this.FilterSanpham = this.ListSanpham.filter(v => v.Title.toLowerCase().includes(query));      
    }
    DoFindDonncc(event:any){
      const query = event.target.value.toLowerCase();
      this.FilterDonncc = this.ListDonncc.filter(v => v.MaDH.toLowerCase().includes(query));      
    }
   DoFindDonhang(event:any){
      const query = event.target.value.toLowerCase();
      this.FilterDonHang = this.ListDonHang.filter(v => v.MaDonHang.toLowerCase().includes(query));      
    }
    SelectDonncc(item:any){
      this.Detail.Sanpham = item.Sanpham
    }
    DoFindDonHang(event:any){
      const query = event.target.value.toLowerCase();
      this.FilterDonHang = this.ListDonHang.filter(v => v.MaDH.toLowerCase().includes(query));      
    }
    SelectDonhang(item:any){
      this.Detail.Sanpham = item.Giohangs.map((v:any)=>{
        return {
          idSP:v.id,
          Soluong:v.Soluong,
          Ghichu:v.Ghichu
        }
      })
    }
    onChangeSoluong(item:any,event:any){
      this.Detail.Soluong = event.target.value
      this.Detail.Thanhtien = this.Detail.Soluong * this.Detail.Dongia
    }

    SaveData()
    {
      if(this.idXuatnhapton=='0')
      {
        this._XuatnhaptonsService.CreateXuatnhapton(this.Detail).then((data:any)=>{
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
          this._route.navigate(['/admin/xuatnhapton', data.id]);
        })
      }
      else
      {
        this._XuatnhaptonsService.updateOneXuatnhapton(this.Detail).then((data:any)=>{
          this._snackBar.open('Cập Nhật Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
         this.isEdit = false
        })
      } 
    }
    DeleteData()
    {
      this._XuatnhaptonsService.DeleteXuatnhapton(this.Detail).then((data:any)=>{
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
        this._route.navigate(['/admin/xuatnhapton'])
      })
    }
  }