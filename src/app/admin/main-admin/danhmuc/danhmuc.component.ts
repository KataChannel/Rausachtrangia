import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DanhmucService } from './danhmuc.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { convertToSlug } from '../../../shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-danhmuc',
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
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {
  Detail: any = {};
  SelectItem: any = {};
  Lists: any ={}
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:99,
    pageNumber:0
  };
  _DanhmucService:DanhmucService = inject(DanhmucService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  async ngOnInit(): Promise<void> {

   this.Lists = await this._DanhmucService.SearchDanhmuc(this.SearchParams)
   this._DanhmucService.danhmucs$.subscribe((data)=>
   {
    if(data){
      this.FilterLists = data
      this.FilterLists.sort((a:any,b:any)=>a.Ordering - b.Ordering)
    }
   })
   //this.FilterLists = this.Lists.items
   console.log(this.Lists);
     
  }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._DanhmucService.SearchDanhmuc(this.SearchParams)
    // this.FilterLists = this.Lists.items
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.FilterLists = this.Lists.items.filter((v:any) => {
       return  v.Title.toLowerCase().includes(value.toLowerCase())
       })
    }
    else {this.FilterLists = this.Lists.items}
  }
  FillSlug()
  {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._DanhmucService.CreateDanhmuc(this.Detail)
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._DanhmucService.DeleteDanhmuc(this.SelectItem)
      }
    });
  }
  ChangeStatus(item:any,type:any)
  {
    item[type]=item[type]==0?1:0
    this._DanhmucService.UpdateDanhmuc(item).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
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
        jsonData.forEach((v:any,k:any) => {
          setTimeout(() => {
            const item:any={}
            item.Title = v.content_vi
            item.id_cat = v.id
            item.Slug = v.tenkhongdau
            this._DanhmucService.CreateDanhmuc(item)
            // const convertedDate = v.Ngay.replace(/_/g, "/")
            // v.Ngayformat = new Date(convertedDate)
            // this.AddChart(v)
            // console.log(v);
          }, 100*k);
        });
        console.log(jsonData);
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