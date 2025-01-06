import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-avatar',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() Image:any={};
  @Input() width:any='';
  @Input() height:any='';
  @Output() UploadEmit = new EventEmitter();
  _UploadService:UploadService = inject(UploadService)
  constructor() { }
  ngOnInit() {}
  async onSelect(event: any) {    
    const result = await this._UploadService.uploadDriver(event.addedFiles[0])
    this.Image = result
    this.UploadEmit.emit(this.Image);
  }
  async onRemove(data: any) {
    const result =  this._UploadService.DeleteuploadDriver(data)    
    this.Image = {}
    this.UploadEmit.emit(this.Image);
  }
}
