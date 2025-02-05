import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { ListsanphamComponent } from '../listsanpham.component';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute } from '@angular/router';
  import { Forms, ListSanpham } from '../listsanpham';
  @Component({
    selector: 'app-detailsanpham',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detailsanpham.component.html',
    styleUrl: './detailsanpham.component.scss'
  })
  export class DetailSanphamComponent {
    _ListsanphamComponent:ListsanphamComponent = inject(ListsanphamComponent)
    _router:ActivatedRoute = inject(ActivatedRoute)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idSanpham:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idSanpham = data.get('id')
        this.Detail.Forms = Forms;
        this.isEdit = this.idSanpham === '0';   
        if (this.idSanpham) {
          this._ListsanphamComponent.drawer.open();     
          this.Detail.Data = ListSanpham.find((v: any) => v.id === this.idSanpham) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.idSanpham=='0')
      {
        ListSanpham.push(this.Detail.Data)
      }
      else
      {
        ListSanpham[this.idSanpham]=this.Detail.Data
      }
      this.isEdit=false  
    }
  }