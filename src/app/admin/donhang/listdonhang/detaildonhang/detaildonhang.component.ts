import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListdonhangComponent } from '../listdonhang.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListDonhang } from '../listdonhang';

@Component({
  selector: 'app-detaildonhang',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detaildonhang.component.html',
  styleUrl: './detaildonhang.component.scss'
})
export class DetailDonhangComponent {
  _ListdonhangComponent:ListdonhangComponent = inject(ListdonhangComponent)
  _router:ActivatedRoute = inject(ActivatedRoute)
  constructor(){}
  Detail:any={Data:{},Forms:[]}
  isEdit:boolean=false
  isDelete:boolean=false
  idDonhang:any
  ngOnInit(): void {
    this._router.paramMap.subscribe(async (data: any) => {
      this.idDonhang = data.get('id')
      this.Detail.Forms = Forms;
      this.isEdit = this.idDonhang === '0';   
      if (this.idDonhang) {
        this._ListdonhangComponent.drawer.open();     
        this.Detail.Data = ListDonhang.find((v: any) => v.id === this.idDonhang) || {};
      } else {
        this.Detail.Data = {};
      }
    });
    
    
  }
  SaveData()
  {
    if(this.idDonhang=='0')
    {
      ListDonhang.push(this.Detail.Data)
    }
    else
    {
      ListDonhang[this.idDonhang]=this.Detail.Data
    }
    this.isEdit=false
    
  }
}
