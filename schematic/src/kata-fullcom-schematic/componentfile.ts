import { capitalize } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";

export function createComponentFiles(tree: Tree, currentPath: string, fileName: string) {
  // Tạo file component.ts
  tree.create( 
      `${currentPath}/list${fileName}/list${fileName}.component.ts`,
`import {AfterViewInit, Component, inject, viewChild, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { List${capitalize(fileName)} } from './list${fileName}';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Detail${capitalize(fileName)}Component } from './detail${fileName}/detail${fileName}.component';
@Component({
  selector: 'app-list${fileName}',
  templateUrl: './list${fileName}.component.html',
  styleUrl: './list${fileName}.component.scss',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
  ],
})
export class List${fileName}Component implements AfterViewInit {
  Detail:any={}
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'email', 
    'Hoten', 
    'SDT',
    'CreateAt',
    'field6',
  ];
  ColumnName:any={
    'STT':'STT',
    'Hoten':'Họ Tên', 
    'email':'Email', 
    'SDT':'SDT',
    'CreateAt':'Ngày Tạo',
    'field6':'Hành Động',
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(List${capitalize(fileName)}); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Detail.id?this.drawer.open():this.drawer.close()
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
       this.drawer.mode = 'over';
       this.paginator.hidePageSize =true
      } else {
        this.drawer.mode = 'side';
      }
    });
    
  }
  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
    this.paginator.pageSize = 30
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Create()
  {
    this.drawer.open();
    this._router.navigate(['admin/${fileName}s', 0])
  }
  goToDetail(item:any)
  {
    this.drawer.open();
    this.Detail=item
    this._router.navigate(['admin/${fileName}s', item.id])  }
}
`);


tree.create( 
  `${currentPath}/list${fileName}/detail${fileName}/detail${fileName}.component.ts`,
`import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { List${fileName}Component } from '../list${fileName}.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, List${capitalize(fileName)} } from '../list${fileName}';

@Component({
  selector: 'app-detail${fileName}',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detail${fileName}.component.html',
  styleUrl: './detail${fileName}.component.scss'
})
export class Detail${capitalize(fileName)}Component {
  _List${fileName}Component:List${fileName}Component = inject(List${fileName}Component)
  _router:ActivatedRoute = inject(ActivatedRoute)
  constructor(){}
  Detail:any={Data:{},Forms:[]}
  isEdit:boolean=false
  isDelete:boolean=false
  id${capitalize(fileName)}:any
  ngOnInit(): void {
    this._router.paramMap.subscribe(async (data: any) => {
      this.id${capitalize(fileName)} = data.get('id')
      this.Detail.Forms = Forms;
      this.isEdit = this.id${capitalize(fileName)} === '0';   
      if (this.id${capitalize(fileName)}) {
        this._List${fileName}Component.drawer.open();     
        this.Detail.Data = List${capitalize(fileName)}.find((v: any) => v.id === this.id${capitalize(fileName)}) || {};
      } else {
        this.Detail.Data = {};
      }
    });
    
    
  }
  SaveData()
  {
    if(this.id${capitalize(fileName)}=='0')
    {
      List${capitalize(fileName)}.push(this.Detail.Data)
    }
    else
    {
      List${capitalize(fileName)}[this.id${capitalize(fileName)}]=this.Detail.Data
    }
    this.isEdit=false
    
  }
}
`);
}