import { Component, inject, signal } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { ListsanphamComponent } from '../listsanpham.component';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute, Route, Router } from '@angular/router';
  import { Forms, ListSanpham } from '../listsanpham';
import { SanphamsService } from '../listsanpham.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    _SanphamsService:SanphamsService = inject(SanphamsService)
    constructor(){}
    Detail:any= signal<any>({});
    isEdit:boolean=false
    isDelete:boolean=false
    idSanpham:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idSanpham = data.get('id')
        this.isEdit = this.idSanpham === '0';   
        if (this.idSanpham&&this.idSanpham !== '0') {
          this._ListsanphamComponent.drawer.open();
          await this._SanphamsService.getSanphamByid(this.idSanpham);     
          this.Detail = this._SanphamsService.Sanpham
        } 
      });   
    }
    SaveData()
    {
      if(this.idSanpham=='0')
      {

      }
      else
      {
        this._SanphamsService.updateOneSanpham(this.Detail())
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
      }
     // this.isEdit=false  
    }
    goBack()
    {
      this._route.navigate(['/admin/sanpham'])
    }
  }