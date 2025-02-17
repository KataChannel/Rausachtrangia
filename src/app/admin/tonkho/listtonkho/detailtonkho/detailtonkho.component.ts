import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute } from '@angular/router';
  import { Forms, ListTonkho } from '../listtonkho';
import { ListTonkhoComponent } from '../listtonkho.component';
  @Component({
    selector: 'app-detailtonkho',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detailtonkho.component.html',
    styleUrl: './detailtonkho.component.scss'
  })
  export class DetailTonkhoComponent {
    _ListtonkhoComponent:ListTonkhoComponent = inject(ListTonkhoComponent)
    _router:ActivatedRoute = inject(ActivatedRoute)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idTonkho:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idTonkho = data.get('id')
        this.Detail.Forms = Forms;
        this.isEdit = this.idTonkho === '0';   
        if (this.idTonkho) {
          this._ListtonkhoComponent.drawer.open();     
          this.Detail.Data = ListTonkho.find((v: any) => v.id === this.idTonkho) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.idTonkho=='0')
      {
        ListTonkho.push(this.Detail.Data)
      }
      else
      {
        ListTonkho[this.idTonkho]=this.Detail.Data
      }
      this.isEdit=false  
    }
    DeleteData()
    {

    }
  }