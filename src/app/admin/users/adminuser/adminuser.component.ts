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
import { ButtonModule } from 'primeng/button';
import moment from 'moment';
import { ListRole, groupByfield } from '../../../shared/shared.utils';
import { UsersService } from '../auth/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-users',
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
    ButtonModule,
  ],
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  Detail: any = {password:'123456'};
  Lists: any={}
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:10,
    pageNumber:0
  };
  sidebarVisible: boolean = false;
  ListRole:any[]=ListRole
  _UsersService:UsersService = inject(UsersService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._UsersService.getUsers()
    this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
    //  console.log(this.FilterLists);
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
     this.Lists = await this._UsersService.getUsers()
     this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=="true") {
        this._UsersService.Dangky(this.Detail).then((data)=>
        {
          if(data[0])
          {
            this._snackBar.open(data[1],'',{
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass:'success',
              duration: 1000,
            });
          }
          else
          {
            this._snackBar.open(`Lỗi xảy ra : ${data[1]}`,'',{
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass:'danger',
              duration: 1000,
            });
          }

        })
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
      const sheetName1 = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const worksheet1 = workbook.Sheets[sheetName1];
      const Users = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc:any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Users);
      console.log(groupByfield(Giagoc));
      Users.forEach((v:any,k:any) => {
        setTimeout(() => {
          const item:any={}
          const Image:any = {Main:v.photo,Thumb:v.thumb}
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg:any)=>gg.idSP==v.id).children||[]
           this._UsersService.updateOneUser(item)
          // this._UsersService.CreateUsers(item)
          console.log(item);
        }, 100*k);
      });

      
    };
    fileReader.readAsArrayBuffer(file);
  }
  writeExcelFile() {
    let Giagoc:any=[]
    let item:any={}
    this.FilterLists.forEach((v:any) => {  
        item.idSP =v.id
        item.TenSP =v.Title
        v.Giagoc.forEach((gg:any) => {
          item = {...item,...gg}
          Giagoc.push(item)
        });
    });    
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Users');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Users_'+moment().format("DD_MM_YYYY"));
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
  GetRole(item:any)
  {
      return ListRole.find((v)=>v.id==item)?.value
  } 
}