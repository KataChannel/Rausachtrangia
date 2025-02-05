import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { ListkhachhangComponent } from '../listkhachhang.component';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute } from '@angular/router';
  import { Forms, ListKhachhang } from '../listkhachhang';
  @Component({
    selector: 'app-detailkhachhang',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detailkhachhang.component.html',
    styleUrl: './detailkhachhang.component.scss'
  })
  export class DetailKhachhangComponent {
    _ListkhachhangComponent:ListkhachhangComponent = inject(ListkhachhangComponent)
    _router:ActivatedRoute = inject(ActivatedRoute)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idKhachhang:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idKhachhang = data.get('id')
        this.Detail.Forms = Forms;
        this.isEdit = this.idKhachhang === '0';   
        if (this.idKhachhang) {
          this._ListkhachhangComponent.drawer.open();     
          this.Detail.Data = ListKhachhang.find((v: any) => v.id === this.idKhachhang) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.idKhachhang=='0')
      {
        ListKhachhang.push(this.Detail.Data)
      }
      else
      {
        ListKhachhang[this.idKhachhang]=this.Detail.Data
      }
      this.isEdit=false  
    }
  }