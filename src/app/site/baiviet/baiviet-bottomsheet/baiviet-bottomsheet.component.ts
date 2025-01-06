import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
//import { ListsanphamBottomsheetComponent } from '../../sanpham/list-sanpham/listsanpham-bottomsheet/listsanpham-bottomsheet.component';

@Component({
  selector: 'app-baiviet-bottomsheet',
  standalone: true,
  imports: [],
  templateUrl: './baiviet-bottomsheet.component.html',
  styleUrls: ['./baiviet-bottomsheet.component.css']
})
export class BaivietBottomsheetComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit() {
  }
  

}
