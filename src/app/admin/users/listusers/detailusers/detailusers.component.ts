import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListUsers } from '../listusers';
import { ListUsersComponent } from '../listusers.component';
  @Component({
    selector: 'app-detailusers',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detailusers.component.html',
    styleUrl: './detailusers.component.scss'
  })
  export class DetailUsersComponent {
    _ListusersComponent:ListUsersComponent = inject(ListUsersComponent)
    _router:ActivatedRoute = inject(ActivatedRoute)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idUsers:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idUsers = data.get('id')
        this.Detail.Forms = Forms;
        this.isEdit = this.idUsers === '0';   
        if (this.idUsers) {
          this._ListusersComponent.drawer.open();     
          this.Detail.Data = ListUsers.find((v: any) => v.id === this.idUsers) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.idUsers=='0')
      {
        ListUsers.push(this.Detail.Data)
      }
      else
      {
        ListUsers[this.idUsers]=this.Detail.Data
      }
      this.isEdit=false  
    }
    DeleteData(){

    }
  }