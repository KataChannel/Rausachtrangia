import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    // Set your translated labels here
    this.itemsPerPageLabel = 'Hiển Thị';
    this.firstPageLabel = 'Trang đầu';
    this.previousPageLabel = 'Trang trước';
    this.nextPageLabel = 'Trang tiếp theo';
    this.lastPageLabel = 'Trang cuối';
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? startIndex + pageSize : length;
      return `${startIndex + 1} - ${endIndex} of ${length}`;
    };
  }
}