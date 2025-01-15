import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListmyorderComponent } from '../listmyorder.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListMyorder } from '../listmyorder';

@Component({
  selector: 'app-detailmyorder',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detailmyorder.component.html',
  styleUrl: './detailmyorder.component.scss'
})
export class DetailMyorderComponent {
  _ListmyorderComponent:ListmyorderComponent = inject(ListmyorderComponent)
  _router:ActivatedRoute = inject(ActivatedRoute)
  constructor(){}
  Detail:any={Data:{},Forms:[]}
  isEdit:boolean=false
  isDelete:boolean=false
  idMyorder:any
  ngOnInit(): void {
    this._router.paramMap.subscribe(async (data: any) => {
      this.idMyorder = data.get('id')
      this.Detail.Forms = Forms;
      this.isEdit = this.idMyorder === '0';   
      if (this.idMyorder) {
        this._ListmyorderComponent.drawer.open();     
        this.Detail.Data = ListMyorder.find((v: any) => v.id === this.idMyorder) || {};
      } else {
        this.Detail.Data = {};
      }
    });
    
    
  }
  SaveData()
  {
    if(this.idMyorder=='0')
    {
      ListMyorder.push(this.Detail.Data)
    }
    else
    {
      ListMyorder[this.idMyorder]=this.Detail.Data
    }
    this.isEdit=false
    
  }
}
