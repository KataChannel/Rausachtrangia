import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HinhanhComponent } from '../../../shared/hinhanh/hinhanh.component';
import { environment } from '../../../../environments/environment';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SanphamAdminComponent } from '../sanphamadmin.component';
import { DanhmucService } from '../../../admin/main-admin/danhmuc/danhmuc.service';
import { SanphamService } from '../../sanpham.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-sanphamadmindetail',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    MatInputModule,
    NgxDropzoneModule,
    HinhanhComponent,
    EditorModule    
  ],
  templateUrl: './sanphamadmindetail.component.html',
  styleUrls: ['./sanphamadmindetail.component.css']
})
export class SanphamAdminDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _SanphamAdminComponent: SanphamAdminComponent = inject(SanphamAdminComponent);
  _SanphamService: SanphamService = inject(SanphamService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  idSP:any;
  Detail:any={}
  Danhmuc:any[]=[]
  filteredDanhmuc:any[]=[]
  constructor(private _snackBar: MatSnackBar) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    if(this.idSP)
    {
    this.Detail = await this._SanphamService.getSanphamByid(this.idSP)
    this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    console.log(this.Detail);
    // console.log(this.Danhmuc);
    this._SanphamAdminComponent.drawer.open()
    }
  }
  CloseDrawer()
  {
    this._SanphamAdminComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    console.log(e);
    this.Detail.Image.Hinhchinh = e
    this._SanphamService.UpdateSanpham(this.Detail);
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    this._SanphamService.UpdateSanpham(this.Detail);
  }
  UpdateSanpham()
  {
    this.Detail.Giagoc =  this.Detail.Bienthe.filter((v:any)=>v.khoiluong!==''&&v.gia!==''&&v.dvt!=='')
    this.Detail.Bienthe.forEach((v:any) => {
      v.GiaCoSo =  Number(this.Detail.GiaCoSo)
    });
    this._SanphamService.UpdateSanpham(this.Detail).then(()=>
    {
        this._snackBar.open('Cập Nhật Thành Công','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });
      })
  }
  AddBienthe()
  {
      this.Detail.Bienthe.push({
        MaSP:this.Detail.MaSP+'-'+Number(Number(this.Detail.Bienthe.length)+1),
        khoiluong:'',
        gia:'',
        dvt:'',
        GiaCoSo:this.Detail.GiaCoSo,
        SLTT:0
      })      
  }
  RemoveBienThe()
  {
    
  }
  APITINYMCE= environment.APITINYMCE;
  configTiny: EditorComponent['init'] = {
    relative_urls: false,
  remove_script_host: false,    // selector: '.dfree-header',
    content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    plugins: [
       'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
       ],
    // quickbars_insert_toolbar: 'undo redo',
    // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height:"300",
    statusbar:false,
    deprecation_warnings: false,
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        // this._UploadService.uploadDriver(file).subscribe((res) => {
        //   if (res) {   
        //     resolve(res.spath);
        //   }
        // });
      });
      return promise;
    }, 
  };
  UpdateGia()
  {
    this.Detail.Bienthe.forEach((v:any,key:any) => {
      this.Detail.Bienthe[key].gia = this.Detail.Bienthe[key].khoiluong*this.Detail.GiaCoSo
    });
  }
}
