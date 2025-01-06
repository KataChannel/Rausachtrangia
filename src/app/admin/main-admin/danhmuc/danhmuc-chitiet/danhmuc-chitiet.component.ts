import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DanhmucComponent } from '../danhmuc.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DanhmucService } from '../danhmuc.service';
import { environment } from '../../../../../environments/environment';
import { HinhanhComponent } from '../../../../shared/hinhanh/hinhanh.component';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-danhmuc-chitiet',
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
  templateUrl: './danhmuc-chitiet.component.html',
  styleUrls: ['./danhmuc-chitiet.component.css']
})
export class DanhmucChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _DanhmucComponent: DanhmucComponent = inject(DanhmucComponent);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  paramsid:any;
  Detail:any={}
  Danhmuc:any[]=[]
  filteredDanhmuc:any[]=[]
  constructor(private _snackBar: MatSnackBar) {
      this.paramsid = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    if(this.paramsid)
    {
    this.Detail = await this._DanhmucService.getDanhmucByid(this.paramsid)
    this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    console.log(this.Detail);
    this._DanhmucComponent.drawer.open()
    }
  }
  CloseDrawer()
  {
    this._DanhmucComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    this.Detail.Image.Hinhchinh = e
    this._DanhmucService.UpdateDanhmuc(this.Detail);
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    console.log(this.Detail);
    this._DanhmucService.UpdateDanhmuc(this.Detail);
  }
  UpdateDanhmuc()
  {
    this._DanhmucService.UpdateDanhmuc(this.Detail).then(()=>
    {
        this._snackBar.open('Cập Nhật Thành Công','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });
      })
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
}
