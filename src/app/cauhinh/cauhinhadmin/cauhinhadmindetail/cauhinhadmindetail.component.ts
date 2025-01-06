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
import { environment } from '../../../../environments/environment';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CauhinhadminComponent } from '../cauhinhadmin.component';
import { DanhmucService } from '../../../admin/main-admin/danhmuc/danhmuc.service';
import { CauhinhService } from '../../cauhinh.service';
import { CauhinhemailComponent } from '../cauhinhemail/cauhinhemail.component';
import { CauhinhfooterComponent } from '../cauhinhfooter/cauhinhfooter.component';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-cauhinhadmindetail',
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
    EditorModule,
    CauhinhemailComponent,
    CauhinhfooterComponent 
  ],
  templateUrl: './cauhinhadmindetail.component.html',
  styleUrls: ['./cauhinhadmindetail.component.css']
})
export class CauhinhadmindetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _CauhinhadminComponent: CauhinhadminComponent = inject(CauhinhadminComponent);
  _CauhinhService: CauhinhService = inject(CauhinhService);
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
      console.log(this.idSP);
      
    this.Detail = await this._CauhinhService.getCauhinhByid(this.idSP)
    this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    console.log(this.Detail);  
    this._CauhinhadminComponent.drawer.open()
    }
  }
  CloseDrawer()
  {
    this._CauhinhadminComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    this.Detail.Image.Hinhchinh = e
    this._CauhinhService.UpdateCauhinh(this.Detail);
  }
  GetDulieu(e:any)
  {
    console.log(e);
     this.Detail.Dulieu = e
    this._CauhinhService.UpdateCauhinh(this.Detail).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 2000,
      });
    });
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    this._CauhinhService.UpdateCauhinh(this.Detail);
  }
  UpdateCauhinh()
  {
    this.Detail.Giagoc =  this.Detail.Giagoc.filter((v:any)=>v.khoiluong!==''&&v.gia!==''&&v.dvt!=='')
    this._CauhinhService.UpdateCauhinh(this.Detail).then(()=>
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
      this.Detail.Giagoc.push({
        MaSP:this.Detail.MaSP+'-'+Number(Number(this.Detail.Giagoc.length)+1),
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
    this.Detail.Giagoc.forEach((v:any,key:any) => {
      this.Detail.Giagoc[key].gia = this.Detail.Giagoc[key].khoiluong*this.Detail.GiaCoSo
    });
  }
}
