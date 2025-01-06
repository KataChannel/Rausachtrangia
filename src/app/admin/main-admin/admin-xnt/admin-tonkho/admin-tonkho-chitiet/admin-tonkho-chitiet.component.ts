import { Component, OnInit, inject } from '@angular/core';
import { TonkhoAdminService } from '../admin-tonkho.service';
import { AdminTonkhoComponent } from '../admin-tonkho.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BaivietAdminComponent } from '../../../baiviet-admin/baiviet-admin.component';
import { environment } from '../../../../../../environments/environment';
import { HinhanhComponent } from '../../../../../shared/hinhanh/hinhanh.component';

@Component({
  selector: 'app-admin-tonkho-chitiet',
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
    EditorModule    
  ],
  templateUrl: './admin-tonkho-chitiet.component.html',
  styleUrls: ['./admin-tonkho-chitiet.component.css']
})
export class AdminTonkhoChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _AdminTonkhoComponent: AdminTonkhoComponent = inject(AdminTonkhoComponent);
  _TonkhoAdminService: TonkhoAdminService = inject(TonkhoAdminService);
  idSP:any;
  Detail:any={}
  Danhmuc:any[]=[]
  filteredDanhmuc:any[]=[]
  APITINYMCE= environment.APITINYMCE;
  constructor(private _snackBar: MatSnackBar) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    this.Detail = await this._TonkhoAdminService.getTonkhoByid(this.idSP)
    console.log(this.Detail);
    this._AdminTonkhoComponent.drawer.open()
  }
  CloseDrawer()
  {
    this._AdminTonkhoComponent.drawer.close()
  }
  UpdateTonkho()
  {
    this._TonkhoAdminService.UpdateTonkhoAdmin(this.Detail).then(()=>
    {
        this._snackBar.open('Cập Nhật Thành Công','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });
      })
  }
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
