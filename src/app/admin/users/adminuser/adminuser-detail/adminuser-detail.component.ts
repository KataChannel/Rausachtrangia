import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AdminuserComponent } from '../adminuser.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { DanhmucService } from '../../../main-admin/danhmuc/danhmuc.service';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UsersService } from '../../auth/users.service';
import { environment } from '../../../../../environments/environment';
import { HinhanhComponent } from '../../../../shared/hinhanh/hinhanh.component';
import { ListRole } from '../../../../shared/shared.utils';
@Component({
  selector: 'app-adminuser-chitiet',
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
  templateUrl: './adminuser-detail.component.html',
  styleUrls: ['./adminuser-detail.component.css']
})
export class AdminuserDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _AdminuserComponent: AdminuserComponent = inject(AdminuserComponent);
  _UsersService: UsersService = inject(UsersService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  idSP:any;
  Detail:any={}
  Danhmuc:any[]=[]
  ListRole:any[]=ListRole
  filteredDanhmuc:any[]=[]
  constructor(private _snackBar: MatSnackBar) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {    
    if(this.idSP)
    {
    this.Detail = await this._UsersService.getUserByid(this.idSP)
    this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    console.log(this.Detail);
    this._AdminuserComponent.drawer.open()
    }
  }
  CloseDrawer()
  {
    this._AdminuserComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    this.Detail.Image = e
    this._UsersService.updateOneUser(this.Detail);
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    console.log(this.Detail);
    this._UsersService.updateOneUser(this.Detail);
  }
  UpdateUseradmin()
  {
    this._UsersService.updateOneUser(this.Detail).then(()=>
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
