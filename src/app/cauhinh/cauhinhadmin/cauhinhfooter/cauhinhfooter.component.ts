import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { BaivietAdminService } from '../../../admin/main-admin/baiviet-admin/baiviet-admin.service';
import { GetImage } from '../../../shared/shared.utils';
import { UploadService } from '../../../shared/upload.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-cauhinhfooter',
  standalone:true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    EditorModule
  ],
  templateUrl: './cauhinhfooter.component.html',
  styleUrls: ['./cauhinhfooter.component.css']
})
export class CauhinhfooterComponent implements OnInit {
  constructor(
    private _UploadService:UploadService
  ) { }
  _BaivietAdminService:BaivietAdminService = inject(BaivietAdminService);
  @Input() Dulieu:any={}
  @Output() UploadDulieu = new EventEmitter();
  ListBaiviet:any[]=[]
  APITINYMCE= environment.APITINYMCE;
  configTiny: EditorComponent['init'] = {
    relative_urls: false,
  remove_script_host: false,    // selector: '.dfree-header',
    content_css: '/styles.css',
    content_style: 'div { border: 1px dashed blue; padding: 10px;}'+
    '.container { width:100% !important }',
    // content_style: 'div { border: 1px dashed blue; padding: 10px;} ' + '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    toolbar: 'baiviet undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    plugins: [
      'baiviet', 'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
       ],
    // quickbars_insert_toolbar: 'undo redo',
    // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height:"500",
    statusbar:false,
    deprecation_warnings: false,
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        this._UploadService.uploadDriver(file).then((res) => {
          if (res) {   
            resolve(GetImage(res.src));
          }
        });
      });
      return promise;
    }, 
    
    setup(editor) {
       editor.ui.registry.addMenuButton('baiviet', {
        text: 'Bài Viết',
        fetch: async function (callback) {
          const items: any[] = [];
          // Fetch dynamic data from another source
          const dynamicData = await fetchData();
          // Add dynamic items here
          dynamicData.forEach((data: any) => {
            const item = {
              type: 'menuitem',
              text: data.Title, // Use the appropriate property from the dynamic data
              onAction: function () {
                editor.insertContent(`<a href="${data.Slug}">${data.Title}</a>`); // Use the appropriate property from the dynamic data
              }
            };
            items.push(item);
          });
          callback(items);
        }
      });

      async function fetchData() {
        const baivietAdminService = new BaivietAdminService(); // Create an instance of BaivietAdminService
        return await baivietAdminService.getAllBaivietAdmin(); // Call the getAllBaivietAdmin method on the instance
      }


      
    },
  };
  async ngOnInit() {}
  UpdateDulieu()
  {
    this.UploadDulieu.emit(this.Dulieu);
  }
  FilterFooter(items:any[],field:any,value:any)
  {
    return items.filter((v:any)=>v[field]==value)
  }
}
