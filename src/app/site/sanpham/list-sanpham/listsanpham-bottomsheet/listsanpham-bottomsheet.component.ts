// import { Component, OnInit } from '@angular/core';
// import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
// import {MatListModule} from '@angular/material/list';
// @Component({
//   selector: 'app-listsanpham-bottomsheet',
//   standalone: true,
//   imports: [MatListModule],
//   templateUrl: './listsanpham-bottomsheet.component.html',
//   styleUrls: ['./listsanpham-bottomsheet.component.css']
// })
// export class ListsanphamBottomsheetComponent implements OnInit {
//   LocDanhmuc:any[]=[
//     {id:1,Title:"Đặc Sản Rau Rừng"},
//     {id:2,Title:"Trái Cây Các Loại"},
//     {id:3,Title:"Các Loại Nấm"},
//   ]
//   LocThuongHieu:any[]=[
//     {id:1,Title:"Rau Sạch Trần Gia"},
//   ]
//   constructor(private _bottomSheetRef: MatBottomSheetRef<ListsanphamBottomsheetComponent>) {}

//   openLink(event: MouseEvent): void {
//     this._bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
//   ngOnInit() {
//   }
//   async applyFilter(event: Event) {
//     const value = (event.target as HTMLInputElement).value;
//     if (value.length > 1) {
//       this.SearchParams.Query=value
//       this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
//       this.FilterSanpham = this.ListSanpham.items
//     }
//     else {
//       delete this.SearchParams.Query
//       this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
//       this.FilterSanpham = this.ListSanpham.items
//     }
//   }

// }
