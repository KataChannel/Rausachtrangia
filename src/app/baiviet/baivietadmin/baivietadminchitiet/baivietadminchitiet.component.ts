import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BaivietAdminComponent } from '../baivietadmin.component';
import { DanhmucService } from '../../../admin/main-admin/danhmuc/danhmuc.service';
import { BaivietService } from '../../baiviet.service';
import { convertToSlug } from '../../../shared/shared.utils';
import { UploadService } from '../../../shared/upload.service';
import { CauhinhemailComponent } from '../../../cauhinh/cauhinhadmin/cauhinhemail/cauhinhemail.component';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-baivietadmin-chitiet',
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
    EditorModule,
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './baivietadminchitiet.component.html',
  styleUrls: ['./baivietadminchitiet.component.css']
})
export class BaivietadminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _BaivietAdminComponent: BaivietAdminComponent = inject(BaivietAdminComponent);
  _BaivietService: BaivietService = inject(BaivietService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  _UploadService: UploadService = inject(UploadService);
  idSP:any;
  Detail:any={MetaTags:{author:'',description:'',keywords:''}}
  Danhmuc:any[]=[]
  ListsBaiviet:any[]=[]
  FilterListsBaiviet:any[]=[]
  TypeArticle:any[]=[]
  filteredDanhmuc:any[]=[]
  ChoosenTag:any
  separatorKeysCodes: number[] = [ENTER, COMMA];
  announcer = inject(LiveAnnouncer);
  @ViewChild('inputAuto') inputAuto!: ElementRef<HTMLInputElement>;

  remove(item: any): void {
    console.log();
    this.Detail.Tags = this.Detail.Tags.filter((v:any) => v.id!==item.id);
    this.FilterListsBaiviet = this.ListsBaiviet.filter(v => !this.Detail?.Tags?.some((v1:any)=>v1.id===v.id));
  }
  constructor(private _snackBar: MatSnackBar) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    // this.TypeArticle = await this._BaivietService.GetLListTypeBaiviet()
    if(this.idSP)
    {
    this.Detail = (await this._BaivietService.SearchBaiviet({id:this.idSP})).items[0]
    this.Danhmuc = (await this._DanhmucService.SearchDanhmuc({Type:'baiviet'}))?.items
    this.ListsBaiviet = (await this._BaivietService.SearchBaiviet({pageSize:9999,pageNumber:0}))?.items
    this.FilterListsBaiviet = this.ListsBaiviet.filter(v => !this.Detail?.Tags?.some((v1:any)=>v1.id===v.id));
    this._BaivietAdminComponent.drawer.open()
    }
  }
  CloseDrawer()
  {
    this._BaivietAdminComponent.drawer.close()
  }
  GetUpload(e:any)
    {
      console.log(e);
      this.Detail.Image.Hinhchinh = e
      this._BaivietService.UpdateBaiviet(this.Detail);
    }
  FillSlug()
  {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  UpdateBaivietadmin()
  {
    this._BaivietService.UpdateBaiviet(this.Detail).then(()=>
    {
        this._snackBar.open('Cập Nhật Thành Công','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });
      })
  }
  onFilterTags(event: Event) {
    const value = (event.target as HTMLInputElement).value; 
    const filter = this.ListsBaiviet.filter(v => !this.Detail?.Tags?.some((v1:any)=>v1.id===v.id))
    this.FilterListsBaiviet = filter.filter(v => v.Title.toLowerCase().includes(value.toLowerCase()));     
  }
  onChoosenTags(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value  
    const check = this.Detail.Tags.find((v:any)=>v.id===value.id)
    console.log(value);
    
    if(!check){
     this.Detail.Tags.push({id:value.id,Title:value.Title,Slug:'blog/'+value.Danhmuc.Slug+'/'+value.Slug});
     this.FilterListsBaiviet = this.ListsBaiviet.filter(v => !this.Detail?.Tags?.some((v1:any)=>v1.id===v.id));
     this.inputAuto.nativeElement.value = '';
    }
    else {
     this.FilterListsBaiviet = this.ListsBaiviet.filter(v => !this.Detail?.Tags?.some((v1:any)=>v1.id===v.id));
    }
  }
  RemoveTag(item: any) {
    console.log(item);
  }
  displayFn(data: any): string {
    return data && data.Title ? data.Title : '';
  }
  APITINYMCE= environment.APITINYMCE;
  configTiny: EditorComponent['init'] = {
    relative_urls: false,
  remove_script_host: false, 
    // selector: '.dfree-header',
    content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    toolbar: 'undo redo |fontfamily forecolor backcolor fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    plugins: [
      'textcolor','quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
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
      const promise = new Promise<string>(async (resolve, reject) => {
        const result = await this._UploadService.uploadDriver(file);
          if (result) {   
            console.log(result);
            
           resolve(result.src);
          }
      });
      return promise;
    }
  }
}
