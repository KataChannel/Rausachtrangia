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
import { SlideadminComponent } from '../slideadmin.component';
import { DanhmucService } from '../../../admin/main-admin/danhmuc/danhmuc.service';
import { SlideService } from '../../slide.service';
@Component({
  selector: 'app-slideadmin-chitiet',
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
  templateUrl: './slideadmindetail.component.html',
  styleUrls: ['./slideadmindetail.component.css']
})
export class SlideadminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _SlideadminComponent: SlideadminComponent = inject(SlideadminComponent);
  _SlideadminService: SlideService = inject(SlideService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  idSP:any;
  Detail:any={}
  Danhmuc:any[]=[]
  TypeArticle:any[]=[]
  filteredDanhmuc:any[]=[]
  constructor(private _snackBar: MatSnackBar) {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    // this.TypeArticle = await this._SlideadminService.GetLListTypeBaiviet()
    // if(this.idSP)
    // {
    // this.Detail = await this._SlideadminService.getBaivietByid(this.idSP)
    // this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    // console.log(this.Detail);
    // this._SlideadminComponent.drawer.open()
    // }
  }
  CloseDrawer()
  {
    this._SlideadminComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    console.log(e.src);
    
    this.Detail.Image.Main = e.src
    this._SlideadminService.UpdateSlide(this.Detail);
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    console.log(this.Detail);
    this._SlideadminService.UpdateSlide(this.Detail);
  }
  UpdateSlideadmin()
  {
    this._SlideadminService.UpdateSlide(this.Detail).then(()=>
    {
        this._snackBar.open('Cập Nhật Thành Công','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });
      })
  }
  
}
