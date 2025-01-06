import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadService } from '../upload.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-hinhanh',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './hinhanh.component.html',
  styleUrls: ['./hinhanh.component.css']
})
export class HinhanhComponent implements OnInit {
  @Input() Image:any={};
  @Input() width:any='';
  @Input() height:any='';
  @Input() Title:any='';
  @Output() UploadEmit = new EventEmitter();
  _UploadService:UploadService = inject(UploadService)
  constructor(public dialog: MatDialog) { }
  ngOnInit() {}
  async onSelect(event: any) {    
    const result = await this._UploadService.uploadDriver(event.addedFiles[0])
    this.Image = result
    this.UploadEmit.emit(this.Image);
  }
  async onRemove(data: any,teamplate: TemplateRef<any>) {

    const dialogRef = this.dialog.open(teamplate, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        const result =  this._UploadService.DeleteuploadDriver(data)    
        this.Image = {}
        this.UploadEmit.emit(this.Image);
      }
    });
  }

}