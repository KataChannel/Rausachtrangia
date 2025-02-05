import { Component, Inject, Input, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { GiohangService } from '../../../main-admin/website/giohang/giohang.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { DiachiAdminComponent } from '../../../diachi/diachi-admin/diachi-admin.component';
import { UsersService } from '../../../users/auth/users.service';
import moment from 'moment';
import { SanphamService } from '../../../main-admin/sanpham/sanpham.service';
import { ForminAdminComponent } from '../../../../../formin/formin-admin/formin-admin.component';
import { ListTrangThaiDonhang, ListHinhthucthanhtoan } from '../../../../shared/shared.utils';
import { TelegramService } from '../../../../shared/telegram.service';
import { MatStepperModule } from '@angular/material/stepper';
import { GiohangcommonComponent } from '../../../giohang/giohangcommon/giohangcommon.component';
import { MatIconModule } from '@angular/material/icon';
import { ChuongtrinhkhuyenmaiAdminService } from '../../../main-admin/admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.service';
import { DonhangsService } from '../../listdonhang/listdonhang.service';
import { ListdonhangComponent } from '../listdonhang.component';
@Component({
  selector: 'app-detaildonhang',
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ForminAdminComponent,
    //TimelineDonhangComponent,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    // KhuyenmaisiteComponent,
    //StepperComponent,
    // MatStepperModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    DiachiAdminComponent,
    GiohangcommonComponent,
    MatIconModule
  ],
  templateUrl: './detaildonhang.component.html',
  styleUrl: './detaildonhang.component.scss'
})
export class DetailDonhangComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  // _DonhangAdminComponent: DonhangAdminComponent = inject(DonhangAdminComponent);
  _GiohangService:GiohangService = inject(GiohangService)
  _SanphamService:SanphamService = inject(SanphamService)
  _DonhangsService:DonhangsService = inject(DonhangsService)
  _router: Router = inject(Router)
  idDonhang:any;
  Detail:any;
  isEdit:boolean=false
  isDelete:boolean=false
  Giohangs: any[] = []
  ListTrangThaiDonhang:any=ListTrangThaiDonhang
  ListHinhthucthanhtoan:any=ListHinhthucthanhtoan
  @ViewChild('GhichuDialog') GhichuDialog!: TemplateRef<any>;
  @ViewChild('dialogXemFormin') dialogXemFormin!: TemplateRef<any>;
  @ViewChild('ChonSanphamDialog') ChonSanphamDialog!: TemplateRef<any>;
  _UsersService: UsersService = inject(UsersService)
  _TelegramService: TelegramService = inject(TelegramService)
  _ListdonhangComponent:ListdonhangComponent = inject(ListdonhangComponent)
  Sanphams:any[]=[]
  FilterSanphams:any[]=[]
  Sanpham:any={}
  Profile: any = {}
  isEditKhachhang:boolean=false
  isEditVanchuyen:boolean=false
  isEditThanhtoan:boolean=false
  isEditGhichu:boolean=false
 Donhang = signal<any>({});
  constructor(
     private dialog:MatDialog,
     private _snackBar: MatSnackBar,
     ) {
      this.idDonhang = this.route.snapshot.params['id'];    
  }
  async ngOnInit() {
    await this._DonhangsService.getDonhangByid(this.idDonhang).then((data)=>
    {
      if(data){
        this._ListdonhangComponent.drawer.open();
      }  
    })
    this.Donhang = this._DonhangsService.Donhang


    if (this.Donhang()?.Giohangs.length>0 && this.Donhang()?.Vanchuyen?.Diachi !== undefined && this.Donhang()?.Vanchuyen?.Diachi !== '') {
      this.UpdatePhiship();
    }
this._UsersService.getProfile().then((data) => {
      if (data) {
        this.Profile = data  
        this.Donhang().idKH = data.id
        this.Donhang().Khachhang.Hoten = data.Hoten
        this.Donhang().Khachhang.Email = data.email
        this.Donhang().Khachhang.SDT = data.SDT
        switch (data.Role) {
          case "nhanvienbanhang":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==1||v.id==2)
            break;
          case "nhanvienkho":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==3)
            break;
          case "nhanvienketoan":
            this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==4)
            break;
          case "admin":
            this.ListTrangThaiDonhang=ListTrangThaiDonhang
            break;
          default:this.ListTrangThaiDonhang=[]
            break;
        }        
      }
    })
    this._SanphamService.getAllSanpham()
    this._SanphamService.sanphams$.subscribe((data:any)=>{if(data){
      this.FilterSanphams = this.Sanphams=data.map((v:any)=>({
      id: v.id,
      id_cat: v.id_cat,
      Title: v.Title,
      Danhmuc: v.Danhmuc,
      Slug: v.Slug,
      Giachon: v.Giachon,
      Giagoc: v.Giagoc,
      Image: v.Image,
      Soluong: v.Soluong,
    }))    
  }})    
  }
  DoSearchSanpham(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.FilterSanphams = this.Sanphams.filter((v)=>v.Title.includes(filterValue.trim().toLowerCase()))
    console.log(this.FilterSanphams);
    
  }
  SaveData()
  {
    if(this.idDonhang=='0')
    {
      //ListDonhang.push(this.Detail.Data)
    }
    else
    {
     // ListDonhang[this.idDonhang]=this.Detail.Data
    }
    this.isEdit=false
  }
  XoaDonhang()
  {
    this.Donhang().Status=99
    this._DonhangsService.updateOneDonhang(this.Donhang).then((data:any) => {
      window.location.href = `admin/donhang`;
      this._ListdonhangComponent.drawer.close()
    })
  }
  UpdateThongtin()
  {
    this._DonhangsService.updateOneDonhang(this.Donhang)
  }
  // Donhang:any= {Thanhtoan:{Hinhthuc:'BANK'}}
  ChooseMethod(item: any) {
    this.Donhang().Thanhtoan.Hinhthuc = item
    this._DonhangsService.updateOneDonhang(this.Donhang)
  }
  XemFormin(teamplate: TemplateRef<any>): void {
    const Lanin = this.Detail.TimePrint.length+1
    this.Detail.TimePrint.push({Title:'Lần In '+Lanin,time:new Date()})    
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
  CoppyDon()
  {
    delete this.Donhang().id
    this._DonhangsService.createDonhang(this.Donhang()).then((data:any)=>{
     setTimeout(() => {
      window.location.href = `admin/donhang/${data.id}`;
     }, 1000);

    })
  }
  GetStatus(item:any,field:any)
  {
    const result = ListTrangThaiDonhang.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  GetHinhthucthanhtoan(item:any,field:any)
  {
    const result = ListHinhthucthanhtoan.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  openGhichu(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {});
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          this.Detail.Status=5
          this._DonhangsService.updateOneDonhang(this.Donhang).then((data:any) => {
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 1000,
            });
          })
        }
        else {
          this._snackBar.open('Đơn hàng chưa được huỷ do chưa nhập lý do.', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-warning'],
          });
          this._snackBar.open('Cập Nhật Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
        }
      });
  } 
  ChangeStatus(item: any, item1: any) {
    if(item1.id==5)
    {
      this.openGhichu(this.GhichuDialog)     
    }
    else{
      item.Status=item1.id
      this._DonhangsService.updateOneDonhang(item).then((data:any) => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
      })
    }
  }
  UpdateDonhang()
  {
    this._DonhangsService.updateOneDonhang(this.Detail).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    })
  }
    ChangeHinhthucthanhtoan(item: any, item1: any) {
      console.log(item,item1);
      
        item.Thanhtoan.Hinhthuc=item1.id
        this._DonhangsService.updateOneDonhang(item).then(() => {
          this._snackBar.open('Cập Nhật Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
        })
    }

     GetDiachi(value: any) {
      console.log(value);
      this.Donhang.Diachis = value
      const Diachi = value.find((v: any) => v.Active == true)
      this.Donhang.Vanchuyen.Diachi = `${Diachi.Diachi ? Diachi.Diachi + ', ' : ''}${Diachi.Phuong ? Diachi.Phuong + ', ' : ''}${Diachi.Quan ? Diachi.Quan + ', ' : ''}${Diachi.Tinh || ''}`;  
    }
    TinhTong(items:any){
      return items.reduce((sum:any, item:any) => sum + item.Tongtien, 0);
    }
    Tongcong:any=0
    Tong:any=0
    Tinhtongcong(value:any){      
      this.Tongcong = value.Tongcong
      this.Tong = value.Tong
    }
    GetGiohangsEmit(value:any){ 
      this.Donhang.Giohangs = value
      this._DonhangsService.updateOneDonhang(this.Donhang)
    }
    Xoagiohang(){ 
      this.Donhang.Giohangs = []
      this._DonhangsService.updateOneDonhang(this.Donhang)
      location.reload()
    }
    MaKhuyenmai:any=''
    _ChuongtrinhkhuyenmaiAdminService:ChuongtrinhkhuyenmaiAdminService = inject(ChuongtrinhkhuyenmaiAdminService)
    async ApdungKhuyenmai() {
      if(this.MaKhuyenmai=='')
      {
        this._snackBar.open('Chưa Nhập Code', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
      }
      else {
        const Khuyenmai = await this._ChuongtrinhkhuyenmaiAdminService.getChuongtrinhkhuyenmaiByCode(this.MaKhuyenmai)
        if (Khuyenmai) {
          console.log(Khuyenmai);
          this.Donhang.Khuyenmai =
          {
            "id": Khuyenmai.id,
            "Title": Khuyenmai.Title,
            "Code": Khuyenmai.Code,
            "Value": Khuyenmai.Value,
            "MinValue": Khuyenmai.MinValue,
            "LoaiKM": Khuyenmai.LoaiKM,
            "startDate": Khuyenmai.startDate,
            "endDate": Khuyenmai.endDate,
            "Type": {
                "Title": Khuyenmai.Type.Title,
                "Value": Khuyenmai.Type.Value
            },
         }
         if(Khuyenmai?.Type?.Value == 'free')
          {
           this.Donhang.Vanchuyen.Phivanchuyen = 0
          }
     
         this._DonhangsService.updateOneDonhang(this.Donhang)
          this._snackBar.open('Áp Dụng Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
        }
        else {
          this._snackBar.open('Code Không Hợp Lệ', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
        }
      }
    }
    Khoangcach:any
    isThanhtoan:boolean=false
    async UpdatePhiship() {
      if (this.Donhang?.Vanchuyen?.Diachi == undefined || this.Donhang?.Vanchuyen?.Diachi == '') {
        this._snackBar.open('Vui lòng nhập đại chỉ', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
      }
      else {
        this.Khoangcach = await this._DonhangsService.getPhiship(this.Donhang?.Vanchuyen?.Diachi)
        if (this.Khoangcach.status == "ZERO_RESULTS") {
          this._snackBar.open('Không tìm được khoảng cách', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
        }
        else {
          if (this.Khoangcach.distance.value <= 4000) {
            this.Donhang.Vanchuyen.Phivanchuyen = 20000
            this.Donhang.Vanchuyen.value = this.Khoangcach.distance.value
            this.Donhang.Vanchuyen.text = this.Khoangcach.distance.text
            this._GiohangService.getDonhang()
            // this._snackBar.open('Đã Cập Nhật Phí Ship', '', {
            //   duration: 1000,
            //   horizontalPosition: "end",
            //   verticalPosition: "top",
            //   panelClass: ['snackbar-success'],
            // });
            this.isThanhtoan = true
          }
          else {
            this.Donhang.Vanchuyen.Phivanchuyen = (this.Khoangcach.distance.value * 5);
            // this.Donhang.Vanchuyen.Phivanchuyen = ((((this.Khoangcach.distance.value - 2000) / 1000) * 5000) + 18000);
            this.Donhang.Vanchuyen.value = this.Khoangcach.distance.value
            this.Donhang.Vanchuyen.text = this.Khoangcach.distance.text
            this._GiohangService.getDonhang()
            // this._snackBar.open('Đã Cập Nhật Phí Ship', '', {
            //   duration: 1000,
            //   horizontalPosition: "end",
            //   verticalPosition: "top",
            //   panelClass: ['snackbar-success'],
            // });
            this.isThanhtoan = true
          }
        }
        console.log(this.Donhang);
        
      }
  
    }
  goBack()
  {

    this._router.navigate(['admin/donhang'])
    this._ListdonhangComponent.drawer.close()
  }
}
