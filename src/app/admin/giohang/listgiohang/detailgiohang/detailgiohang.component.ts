import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListgiohangComponent } from '../listgiohang.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListGiohang } from '../listgiohang';

@Component({
  selector: 'app-detailgiohang',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detailgiohang.component.html',
  styleUrl: './detailgiohang.component.scss'
})
export class DetailGiohangComponent {
  _ListgiohangComponent:ListgiohangComponent = inject(ListgiohangComponent)
  _router:ActivatedRoute = inject(ActivatedRoute)
  constructor(){}
  Detail:any={Data:{},Forms:[]}
  isEdit:boolean=false
  isDelete:boolean=false
  idGiohang:any
  ngOnInit(): void {
    this._router.paramMap.subscribe(async (data: any) => {
      this.idGiohang = data.get('id')
      this.Detail.Forms = Forms;
      this.isEdit = this.idGiohang === '0';   
      if (this.idGiohang) {
        this._ListgiohangComponent.drawer.open();     
        this.Detail.Data = ListGiohang.find((v: any) => v.id === this.idGiohang) || {};
      } else {
        this.Detail.Data = {};
      }
    });
    
    
  }
  SaveData()
  {
    if(this.idGiohang=='0')
    {
      ListGiohang.push(this.Detail.Data)
    }
    else
    {
      ListGiohang[this.idGiohang]=this.Detail.Data
    }
    this.isEdit=false
    
  }
}
