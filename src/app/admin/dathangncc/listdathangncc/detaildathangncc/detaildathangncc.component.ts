import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Route, Router } from '@angular/router';
  import { Forms, ListDathangncc } from '../listdathangncc';
import { ListDathangnccComponent } from '../listdathangncc.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NhacungcapsService } from '../listnhacungcap.service';
import { DonnccsService } from '../listdathangncc.service';
import { randomUUID } from 'crypto';
import { GenId, genMaDonhang } from '../../../../shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { SanphamService } from '../../../main-admin/sanpham/sanpham.service';
  @Component({
    selector: 'app-detaildathangncc',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule
    ],
    templateUrl: './detaildathangncc.component.html',
    styleUrl: './detaildathangncc.component.scss'
  })
  export class DetailDathangnccComponent {
    _ListdathangnccComponent:ListDathangnccComponent = inject(ListDathangnccComponent)
    _NhacungcapsService:NhacungcapsService = inject(NhacungcapsService)
    _DonnccsService:DonnccsService = inject(DonnccsService)
    _SanphamService:SanphamService = inject(SanphamService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={Sanpham:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idDathangncc:any
    FilterNhacungcap:any[]=[]
    ListNhacungcap:any[]=[]
    FilterSanpham:any[]=[]
    ListSanpham:any[]=[]
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idDathangncc = data.get('id')
        this.isEdit = this.idDathangncc === '0';   
        if(!this.idDathangncc){
          this._route.navigate(['/admin/dathangncc'])
        }
        else{
          this._ListdathangnccComponent.drawer.open();
          this._NhacungcapsService.getAllNhacungcap().then((data:any)=>{
            this.FilterNhacungcap = this.ListNhacungcap = data
          })
          this._SanphamService.getAllSanpham().then((data:any)=>{
            this.FilterSanpham = this.ListSanpham = data
          })
          if(this.idDathangncc !== '0'){
            this._DonnccsService.getDonnccByid(this.idDathangncc).then((data:any)=>{
              if(data){
                this.Detail = data
                console.log(data);
                
              }
            })
          } else {
            this.Detail={Sanpham:[]}
            this.Detail.MaDH = GenId(8,false) 
          }
        }
      });   
    }
    SaveData()
    {
      if(this.idDathangncc=='0')
      {
        this._DonnccsService.CreateDonncc(this.Detail).then((data:any)=>{
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
          this._route.navigate(['/admin/dathangncc', data.id]);
        })
      }
      else
      {
        this._DonnccsService.updateOneDonncc(this.Detail).then((data:any)=>{
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
      this._DonnccsService.DeleteDonncc(this.Detail).then((data:any)=>{
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
        this._route.navigate(['/admin/dathangncc'])
      })
    }
    goBack(){
      this._route.navigate(['/admin/dathangncc'])
    }
    DoFindNhacungcap(event:any){
        const query = event.target.value.toLowerCase();
        this.FilterNhacungcap = this.ListNhacungcap.filter(v => v.TenKH.toLowerCase().includes(query));      
      }
    SelectNhacungcap(event:any){     
        const selectedNhacungcap = this.ListNhacungcap.find(v => v.id === event.value);      
        if (selectedNhacungcap) {
          this.Detail.Nhacungcap = {
            ...this.Detail.Nhacungcap,
            TenKH: selectedNhacungcap.TenKH,
            SDT: selectedNhacungcap.SDT,
            Diachi: selectedNhacungcap.Diachi
          };
          this.Detail.idBanggia = selectedNhacungcap.idBanggia
        }
      }
    DoFindSanpham(event:any){
        const query = event.target.value.toLowerCase();
        this.FilterSanpham = this.ListSanpham.filter(v => v.Title.toLowerCase().includes(query));      
      }
    SelectSanpham(event:any){           
        // const selectedSanpham = this.ListSanpham.find(v => v.id === event.value);      
        // if (selectedSanpham) {
        //   this.Detail.Nhacungcap = {
        //     ...this.Detail.Nhacungcap,
        //     TenKH: selectedSanpham.TenKH,
        //     SDT: selectedNhacungcap.SDT,
        //     Diachi: selectedNhacungcap.Diachi
        //   };
        //   this.Detail.idBanggia = selectedNhacungcap.idBanggia
        // }
      }
    onChangeSoluong(item:any,event:any){
        this.Detail.Soluong = event.target.value
        this.Detail.Thanhtien = this.Detail.Soluong * this.Detail.Dongia
      }
  }