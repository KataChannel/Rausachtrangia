import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Forms, ListNhacungcap } from '../listnhacungcap';
import { ListNhacungcapComponent } from '../listnhacungcap.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenId } from '../../../../shared/shared.utils';
import { NhacungcapsService } from '../listnhacungcap.service';
  @Component({
    selector: 'app-detailnhacungcap',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detailnhacungcap.component.html',
    styleUrl: './detailnhacungcap.component.scss'
  })
  export class DetailNhacungcapComponent {
    _ListnhacungcapComponent:ListNhacungcapComponent = inject(ListNhacungcapComponent)
    _NhacungcapsService:NhacungcapsService = inject(NhacungcapsService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    idNhacungcap:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idNhacungcap = data.get('id')
        if(!this.idNhacungcap){
          this._route.navigate(['/admin/dathangncc'])
        }
        else{
          this._ListnhacungcapComponent.drawer.open();
          if(this.idNhacungcap !== '0'){
            this._NhacungcapsService.getNhacungcapByid(this.idNhacungcap).then((data:any)=>{
              if(data){
                this.Detail = data
                console.log(data); 
              }
            })
          } else {
            this.Detail={}
          }
        }
      });  
    }
    SaveData()
    {
      if(this.idNhacungcap=='0')
      {
        this._NhacungcapsService.CreateNhacungcap(this.Detail).then((data:any)=>{
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
          this._route.navigate(['/admin/nhacungcap', data.id]);
        })
        }
        else
        {
          this._NhacungcapsService.updateOneNhacungcap(this.Detail).then((data:any)=>{
            this._snackBar.open('Cập Nhật Thành Công', '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
            this.isEdit=false
          })
        }  
    }
    DeleteData()
    {
      ListNhacungcap.splice(this.idNhacungcap,1)
      this.isDelete=false
    }
  }