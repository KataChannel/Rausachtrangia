import { Component, OnInit, inject } from '@angular/core';
import { LienheAdminService } from '../../admin-lienhe/admin-lienhe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BaivietAdminService } from '../../baiviet-admin/baiviet-admin.service';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  Detail:any={}
  Baiviet:any={}
  _LienheAdminService:LienheAdminService = inject(LienheAdminService)
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService)
  Slug:any
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) { 
    this.Slug = this.route.snapshot.data['slug'];
  }

  async ngOnInit() {
    if(this.Slug)
    {
      this.Baiviet = await this._BaivietAdminService.getBaivietBySlug(this.Slug)
    }
  }
  CreateLienhe() {
    this.Detail.Type={Title:'Form Liên Hệ',Slug:'form-lien-he'}
    this._LienheAdminService.CreateLienheAdmin(this.Detail).then(()=>
    {
      this.Detail={}
      this._snackBar.open('Gửi Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }


}
