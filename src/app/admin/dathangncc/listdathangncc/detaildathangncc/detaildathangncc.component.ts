import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Route, Router } from '@angular/router';
  import { Forms, ListDathangncc } from '../listdathangncc';
import { ListDathangnccComponent } from '../listdathangncc.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DathangnccsService } from '../listdathangncc.service';
  @Component({
    selector: 'app-detaildathangncc',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detaildathangncc.component.html',
    styleUrl: './detaildathangncc.component.scss'
  })
  export class DetailDathangnccComponent {
    _ListdathangnccComponent:ListDathangnccComponent = inject(ListDathangnccComponent)
    _DathangnccsService:DathangnccsService = inject(DathangnccsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idDathangncc:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idDathangncc = data.get('id')
        this.isEdit = this.idDathangncc === '0';   
        if (this.idDathangncc) {
          this._ListdathangnccComponent.drawer.open();     
          // this.Detail.Data = ListDathangncc.find((v: any) => v.id === this.idDathangncc) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.idDathangncc=='0')
      {
        this._DathangnccsService.CreateDathangncc(this.Detail).then((data:any)=>{
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
          this._route.navigate(['/admin/dathangncc', data.id]);
        })
      }
      else
      {
        ListDathangncc[this.idDathangncc]=this.Detail.Data
      }
      this.isEdit=false  
    }
    DeleteData()
    {

    }
  }