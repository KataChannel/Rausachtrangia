import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import { GenId, convertToSlug } from '../../../../shared/shared.utils';
import { TonkhoAdminService } from './admin-tonkho.service';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-admin-tonkho',
  standalone:true,
  imports:[
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule
  ],
  templateUrl: './admin-tonkho.component.html',
  styleUrls: ['./admin-tonkho.component.css']
})
export class AdminTonkhoComponent implements OnInit {
  Detail: any = {Code:'KM'+GenId(8,false)};
  Lists: any={}
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:10,
    pageNumber:0
  };
  TypeArticle:any[] = []
  pageSizeOptions: any[] = []
  ListLoaiKM:any=[
    {Title:'%',Value:'phantram'},
    {Title:'đ',Value:'giatri'},
  ]
  _TonkhoAdminService:TonkhoAdminService = inject(TonkhoAdminService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._TonkhoAdminService.SearchTonkhoAdmin(this.SearchParams)
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v < this.Lists.totalCount);
    this.FilterLists = this.Lists.items
     console.log(this.Lists);
  } 
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.FilterLists = this.Lists.items.filter((v:any) => {
     return  v.Title.toLowerCase().includes(value)||v.Mota.toLowerCase().includes(value)
       })
    }
    else {this.FilterLists = this.Lists.items}
  }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._TonkhoAdminService.SearchTonkhoAdmin(this.SearchParams)
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._TonkhoAdminService.CreateTonkhoAdmin(this.Detail)
      }
    });
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      const transformedData = jsonData.map((v:any, k) => ({
       idSP: v.idSP,
       Soluong:v.Soluong
      }));
      transformedData.forEach((v:any,k:any) => {
        setTimeout(() => {
           this._TonkhoAdminService.CreateTonkhoAdmin(v)
        }, 100*k);
      });
      console.log(transformedData);
      
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
}