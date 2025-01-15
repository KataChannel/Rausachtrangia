// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { ListdonhangComponent } from '../listdonhang.component';
// import { MatButtonModule } from '@angular/material/button';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Forms, ListDonhang } from '../listdonhang';
// import { DonhangsService } from '../listdonhang.service';

// @Component({
//   selector: 'app-detaildonhang',
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     MatIconModule,
//     MatButtonModule,
//   ],
//   templateUrl: './detaildonhang.component.html',
//   styleUrl: './detaildonhang.component.scss'
// })
// export class DetailDonhangComponent {
//   _ListdonhangComponent:ListdonhangComponent = inject(ListdonhangComponent)
//   _route:ActivatedRoute = inject(ActivatedRoute)
//   _router: Router = inject(Router)
//   _DonhangsService:DonhangsService= inject(DonhangsService)
//   constructor(){}
//   Detail:any={Data:{},Forms:[]}
//   isEdit:boolean=false
//   isDelete:boolean=false
//   idDonhang:any
//   async ngOnInit(): Promise<void> {
//     this._route.paramMap.subscribe(async (data: any) => {
//       this.idDonhang = data.get('id')
//       this.Detail.Forms = Forms;
//       this.isEdit = this.idDonhang === '0';   
//       if (this.idDonhang) {
//         await this._DonhangsService.getDonhangByid(this.idDonhang)
//         this._ListdonhangComponent.drawer.open();    
//         this._ListdonhangComponent.Detail = this.Detail.Data = this._DonhangsService.Donhang() || {};
//         console.log(this._ListdonhangComponent.Detail);
//       } else {
//         this.Detail.Data = {};
//       }
//     });
    
    
//   }
//   SaveData()
//   {
//     if(this.idDonhang=='0')
//     {
//       ListDonhang.push(this.Detail.Data)
//     }
//     else
//     {
//       ListDonhang[this.idDonhang]=this.Detail.Data
//     }
//     this.isEdit=false
    
//   }
//   goBack()
//   {

//     this._ListdonhangComponent.Detail = {}
//     this._router.navigate(['admin/donhang'])
//     this._ListdonhangComponent.drawer.close()
//   }
// }
