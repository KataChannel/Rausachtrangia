import { capitalize } from "@angular-devkit/core/src/utils/strings";
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
// Generate file with dynamic content
async function generateFile(filePath, content) {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content.trim());
      console.log(chalk.green(`Created: ${filePath}`));
    } catch (error) {
      console.error(chalk.red(`Error creating ${filePath}:`), error.message);
    }
  }
  
  // Generate all files
 export async function generateAngularFiles({ name, outputDir }) {
    const pascalCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    const dasherizedName = name.toLowerCase().replace(/\s+/g, '-');
  
  const componentListFile = path.join(outputDir, `list${dasherizedName}/list${dasherizedName}.component.ts`);
  const componentListContent = `
  import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, List${capitalize(dasherizedName)} } from './list${dasherizedName}';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ${capitalize(dasherizedName)}sService } from './list${dasherizedName}.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { convertToSlug } from '../../../shared/shared.utils';

@Component({
  selector: 'app-list${dasherizedName}',
  templateUrl: './list${dasherizedName}.component.html',
  styleUrls: ['./list${dasherizedName}.component.scss'],
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
    MatSelectModule,
    CommonModule
  ],
})
export class List${capitalize(dasherizedName)}Component implements AfterViewInit {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnName: any = { 'STT': 'STT' };
  Forms: any[] = Forms;
  FilterColumns: any[] = JSON.parse(localStorage.getItem('${dasherizedName}_FilterColumns') || '[]');
  Columns: any[] = [];
  List${dasherizedName}: any[] = List${capitalize(dasherizedName)};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _${dasherizedName}sService: ${capitalize(dasherizedName)}sService = inject(${capitalize(dasherizedName)}sService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._${dasherizedName}sService.getAll${capitalize(dasherizedName)}();
    this.List${dasherizedName} = this._${dasherizedName}sService.List${dasherizedName}();
    this.List${dasherizedName}.forEach((v:any) => {
      v.giagoc = v.Giagoc[0].gia;
      v.dvt = v.Giagoc[0].dvt;
    });
    console.log(this._${dasherizedName}sService.List${dasherizedName}());
    this.initializeColumns();
    this.setupDataSource();
    this.setupDrawer();
  }

  private initializeColumns(): void {
    this.Columns = Object.keys(List${capitalize(dasherizedName)}[0]).map(key => ({
      key,
      value: List${capitalize(dasherizedName)}[0][key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem('${dasherizedName}_FilterColumns', JSON.stringify(this.FilterColumns));
    }

    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.List${dasherizedName}.slice(1).map(v =>
      this.FilterColumns.filter(item => item.isShow).reduce((obj, item) => {
        obj[item.key] = v[item.key];
        return obj;
      }, {})
    ));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupDrawer(): void {

    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = 'side';
      }
    });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find(v => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter(v => v.isShow).map(item => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    this.setupDataSource();
    localStorage.setItem('${dasherizedName}_FilterColumns', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter(v => v.value.toLowerCase().includes(query));    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/${dasherizedName}s', 0]);
  }

  goToDetail(item: any): void {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(['admin/${dasherizedName}s', item.id]);
  }
}`;


  const componentDetailFile = path.join(outputDir, `list${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.ts`);
  const componentDetailContent = `
import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { List${dasherizedName}Component } from '../list${dasherizedName}.component';
  import { MatButtonModule } from '@angular/material/button';
  import { ActivatedRoute } from '@angular/router';
  import { Forms, List${capitalize(dasherizedName)} } from '../list${dasherizedName}';
  @Component({
    selector: 'app-detail${dasherizedName}',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
    ],
    templateUrl: './detail${dasherizedName}.component.html',
    styleUrl: './detail${dasherizedName}.component.scss'
  })
  export class Detail${capitalize(dasherizedName)}Component {
    _List${dasherizedName}Component:List${dasherizedName}Component = inject(List${dasherizedName}Component)
    _router:ActivatedRoute = inject(ActivatedRoute)
    constructor(){}
    Detail:any={Data:{},Forms:[]}
    isEdit:boolean=false
    isDelete:boolean=false
    id${capitalize(dasherizedName)}:any
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.id${capitalize(dasherizedName)} = data.get('id')
        this.Detail.Forms = Forms;
        this.isEdit = this.id${capitalize(dasherizedName)} === '0';   
        if (this.id${capitalize(dasherizedName)}) {
          this._List${dasherizedName}Component.drawer.open();     
          this.Detail.Data = List${capitalize(dasherizedName)}.find((v: any) => v.id === this.id${capitalize(dasherizedName)}) || {};
        } else {
          this.Detail.Data = {};
        }
      });   
    }
    SaveData()
    {
      if(this.id${capitalize(dasherizedName)}=='0')
      {
        List${capitalize(dasherizedName)}.push(this.Detail.Data)
      }
      else
      {
        List${capitalize(dasherizedName)}[this.id${capitalize(dasherizedName)}]=this.Detail.Data
      }
      this.isEdit=false  
    }
  }`;




  const componentListHTMLFile = path.join(outputDir, `list${dasherizedName}/list${dasherizedName}.component.html`);
  const componentListHTMLContent = `
<mat-drawer-container class="w-full h-full" autosize>
    <mat-drawer #drawer class="flex flex-col lg:!w-1/3 !w-full h-full" [position]="'end'">    
      <router-outlet></router-outlet>
    </mat-drawer>
  <div class="flex flex-col space-y-2 h-screen-12 w-full justify-between p-2">
      <div class="flex flex-col space-y-2 w-full p-2">
              <div class="cursor-pointer w-full flex flex-row space-x-2 items-center justify-between bg-white rounded-lg p-2">
                <div class="flex flex-row space-x-2 items-center">
                <div class="relative">
                      <input type="text" placeholder="Tìm Kiếm..." #input (keyup)="applyFilter($event)"
                          class="block pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span class="material-symbols-outlined text-gray-500">search</span>
                      </div>
                  </div>
                  <button mat-flat-button color="primary" (click)="create()">
                      <span>Thêm</span>
                      <mat-icon>add_circle</mat-icon>
                  </button>
                </div>  
                  <div class="flex flex-row space-x-2 items-center">
                    <span class="whitespace-nowrap p-2 rounded-lg bg-slate-200">
                        {{dataSource?.filteredData?.length}} Sản Phẩm
                    </span>                
                      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                          <mat-icon>tune</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                          <div class="p-4">
                              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                                  <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput placeholder="Tìm Kiếm" />
                                  <mat-icon matPrefix>search</mat-icon>
                               </mat-form-field> 
                          </div>
                          <div class="flex flex-col max-h-80 overflow-auto">
                          @for (item of FilterColumns; track item.key) {
                              <button mat-menu-item (click)="toggleColumn(item);$event.stopPropagation()">
                                  <mat-icon>{{item.isShow?'check_box':'check_box_outline_blank'}}</mat-icon>
                                  <span>{{item.value}}</span>
                              </button>
                           }
                          </div>
                        </mat-menu> 
                  </div>                 
              </div>

          <div class="w-full opverflow-auto">
              <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
                  @for (column of displayedColumns; track column) {
                      <ng-container [matColumnDef]="column">
                          <th class="whitespace-nowrap" mat-header-cell *matHeaderCellDef mat-sort-header>
                              <span class="max-w-40 line-clamp-4">
                                  {{ ColumnName[column] }}
                              </span>
                          </th>
                          <td class="" mat-cell *matCellDef="let row;let idx = index">
                              <span class="max-w-40 line-clamp-4">
                                  {{ column === 'STT' ? idx + 1 : row[column] }}
                              </span>
                          </td>
                       </ng-container>
                  }
                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="goToDetail(row);"></tr>
                  <tr class="mat-row" *matNoDataRow>
                      <td class="mat-cell" colspan="4">Không tìm thấy "{{input.value}}"</td>
                  </tr>
              </table>
              <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
          </div>
      </div>    
  </div>
  </mat-drawer-container>`;




  const componentDetailHTMLFile = path.join(outputDir, `list${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.html`);
  const componentDetailHTMLContent = `
<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="_List${dasherizedName}Component.drawer.close()">
      <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{Detail?.Hoten||'Không có dữ liệu'}}</div>
  <div class="flex flex-row space-x-2 items-center">
    @if(isEdit==true){
      <button mat-icon-button color="primary" (click)="SaveData()">
          <mat-icon>save</mat-icon>
      </button>
    }
    @else{
      <button mat-icon-button color="primary" (click)="isEdit=true">
          <mat-icon>edit</mat-icon>

      </button>
    }
      <button mat-icon-button color="warn" (click)="isDelete=true">
          <mat-icon>delete</mat-icon>
      </button>
  </div>
</div>
<div class="relative flex flex-col w-full p-4 overflow-auto">
  @if(isDelete==true){
    <div class="flex flex-col space-y-4 items-center justify-center">
      <div class="font-bold text-2xl">Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" (click)="DeleteData()">
          Đồng Ý
        </button>
        <button mat-flat-button color="warn" (click)="isDelete=false">
          Huỷ Bỏ
        </button>
      </div>
    </div>
  }
  @else {
    @for (item of Detail?.Forms; track item.id; let idx = $index) {
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{item.Title}}</mat-label>
        <input matInput [(ngModel)]="Detail?.Data[item.value]" [disabled]="!isEdit" [ngModelOptions]="{standalone: true}" [placeholder]="item.Title">
      </mat-form-field>
    }
    @empty {
      <span class="p-2 text-center">There are no items.</span>
     }
  }
</div>`;


const componentListCssFile = path.join(outputDir, `list${dasherizedName}/list${dasherizedName}.component.scss`);
const componentListCssContent = ``;

const componentDetailCssFile = path.join(outputDir, `list${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.scss`);
const componentDetailCssContent = ``;

const componentServiceFile = path.join(outputDir, `list${dasherizedName}/list${dasherizedName}.service.ts`);
const componentServiceContent = `import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { StorageService } from '../../../shared/utils/storage.service';
@Injectable({
  providedIn: 'root'
})
export class ${capitalize(dasherizedName)}sService {
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  private isBrowser: boolean;
  constructor(
    private _StorageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  List${capitalize(dasherizedName)} = signal<any[]>([]);
  ${capitalize(dasherizedName)} = signal<any>({});
  async Create${capitalize(dasherizedName)}(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/${dasherizedName}, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAll${capitalize(dasherizedName)}()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async getAll${capitalize(dasherizedName)}() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(\`\${environment.APIURL}/${dasherizedName}s\`, options);
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();     
      this.List${capitalize(dasherizedName)}.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async Search${capitalize(dasherizedName)}(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(\`\${environment.APIURL}/setting/search\`,options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          const data = await response.json();
          this.${capitalize(dasherizedName)}.set(data.items)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async get${capitalize(dasherizedName)}Byid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(\`\${environment.APIURL}/${dasherizedName}s/\${id}\`, options);
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();
      this.${capitalize(dasherizedName)}.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateOne${capitalize(dasherizedName)}(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/${dasherizedName}s/\${dulieu.id}\`, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAll${capitalize(dasherizedName)}()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async Delete${capitalize(dasherizedName)}(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(\`\${environment.APIURL}/${dasherizedName}s/\${item.id}\`, options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          this.getAll${capitalize(dasherizedName)}()
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}`;
const componentMockdataFile = path.join(outputDir, `list${dasherizedName}/list${dasherizedName}.ts`);
const componentMockdataContent = `export const List${capitalize(dasherizedName)}:any[]=[
    {
        "id": "8efd5ba3-d073-4baf-ab89-31180ee7471d",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "098765421",
        "idGroup": "",
        "Code": "751221",
        "Hoten": "test1",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "test1@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$YSq7l4/1fe7ihGsxRaS/CuG0bP93xyYmcBWVuMbXr96c18HIQOU/e",
        "ListImage": [],
        "Profile": [],
        "Role": "user",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-12-11T03:11:52.074Z",
        "UpdateAt": "2024-12-11T03:11:52.074Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "930e46a3-c2be-4063-a395-0adda0c24218",
        "ref_id": "0",
        "gid": "115812709741721912709",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "",
        "idGroup": "",
        "Code": "655487",
        "Hoten": "",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "quocbao280783@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$iqsxkNI.ljPmvC/Cu.0hWOtRVzRkcHmE.xz1Oc59godPAjdLJ.pTS",
        "ListImage": [],
        "Profile": [],
        "Role": "user",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-12-06T07:23:12.949Z",
        "UpdateAt": "2024-12-10T05:06:03.000Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "ba962571-6c61-4a63-8dfd-7550ef982468",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "",
        "idGroup": "",
        "Code": "342212",
        "Hoten": "",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "chikietit@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$f6emY.ehT0BnUnObpIz8iOERl8AOOsTDicz9VZsmKHrh5FQyHBRwi",
        "ListImage": [],
        "Profile": [],
        "Role": "user",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-12-05T08:29:55.283Z",
        "UpdateAt": "2024-12-05T08:29:55.283Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "e94a4da4-12d1-4e3c-8759-23a0a5914156",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "",
        "idGroup": "",
        "Code": "470177",
        "Hoten": "",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "wetdragon1996@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$HQqUp5pLAPDedsNI4h8s9eg/NB1FCBQ/HtOPOJx72i/v90J4ZV9SK",
        "ListImage": [],
        "Profile": [],
        "Role": "user",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-12-02T03:09:43.472Z",
        "UpdateAt": "2024-12-05T09:02:12.000Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "0ca0f7b4-56ad-414a-846b-4c867da4c891",
        "ref_id": "0",
        "gid": "116895729763152566602",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "",
        "idGroup": "",
        "Code": "256165",
        "Hoten": "",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "katachanneloffical@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$pJxBQaiFty9D1e6Bjv.0j.GX5mobsLCt6t22/eoX.Hf8FfIQoo94u",
        "ListImage": [],
        "Profile": [],
        "Role": "user",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-11-25T09:18:25.812Z",
        "UpdateAt": "2024-12-17T11:51:53.000Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "7fa80031-41e4-4dea-ab3d-8b6b989cf124",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0934123456",
        "idGroup": "",
        "Code": "896331",
        "Hoten": "Hồ Anh Tuấn",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "tuan.mkt@tuanho.com",
        "Gioitinh": "",
        "EditChinhanhs": [],
        "Diachi": [],
        "password": "$2b$10$iZZK6SLEdvG2Wjj3cdsxFOQYwl.xx9zeRev6wZUG0FYcniyJpcPY6",
        "ListImage": [],
        "Profile": [],
        "Role": "customer",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-01-19T01:26:43.112Z",
        "UpdateAt": "2024-01-19T01:26:43.112Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "43921534-d600-443e-8ec1-26cc7d93ff18",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0987654321",
        "idGroup": "caaeadb0-64d3-4e5a-b42f-bc45abbbba06",
        "Code": "757379",
        "Hoten": "Tester",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "tester@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [
            {
                "Title": "Taza Skin Clinic ?à N?ng",
                "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
                "Checked": false
            },
            {
                "Title": "Taza Skin Clinic Nha Trang",
                "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
                "Checked": false
            },
            {
                "Title": "Taza Skin Clinic Gò V?p",
                "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
                "Checked": false
            },
            {
                "Title": "Taza Skin Clinic Th? ??c",
                "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
                "Checked": false
            },
            {
                "Title": "Taza Skin Clinic Qu?n 10",
                "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
                "Checked": false
            },
            {
                "Title": "Timona Academy C? S? Qu?n 10",
                "id": "34aa91e2-c469-42bb-898b-a11618452ebd",
                "Checked": false
            },
            {
                "Title": "Timona Academy C? S? Gò V?p",
                "id": "ee3d1ed9-eafa-4b89-b045-46fa347c377e",
                "Checked": false
            },
            {
                "Title": "Timona Academy c? s? ?à N?ng",
                "id": "7c152522-3858-4669-b745-a1fd2d25ad9a",
                "Checked": false
            },
            {
                "Title": "Timona Academy c? s? Nha Trang",
                "id": "9a5cdc4d-fbbf-41c2-9222-9c01d5433148",
                "Checked": false
            },
            {
                "Title": "Timona Academy c? s? Th? ??c",
                "id": "c4a68bd5-c120-4bf0-a4d1-447e4921eb76",
                "Checked": false
            },
            {
                "Title": "Timona Academy c? s? Cách M?ng Tháng 8",
                "id": "3b9e91d5-21ac-44b2-ba01-e87ee310fdcd",
                "Checked": false
            }
        ],
        "Diachi": [],
        "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
        "ListImage": [],
        "Profile": [],
        "Role": "admin",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2024-01-15T01:02:36.313Z",
        "UpdateAt": "2024-04-09T01:23:42.000Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "b045e2e2-5c44-4bef-ba84-7cb6b14ef6a5",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0786810434",
        "idGroup": "e3be8e89-0530-435d-be42-29e8aef77794",
        "Code": "935519",
        "Hoten": "Đan Thanh",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "leadercskh.cgo@tazagroup.vn",
        "Gioitinh": "",
        "EditChinhanhs": [
            {
                "Title": "Taza Skin Clinic ?à N?ng",
                "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Nha Trang",
                "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Gò V?p",
                "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Th? ??c",
                "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Qu?n 10",
                "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
                "Checked": true
            }
        ],
        "Diachi": [],
        "password": "$2b$10$zimmBmMej7nv2Jpx.BH.JOQ6dSyUZIiKiHZoWBIyccflCxLqftyf2",
        "ListImage": [],
        "Profile": [],
        "Role": "admin",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2023-12-14T01:51:51.061Z",
        "UpdateAt": "2024-11-26T05:07:30.000Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "6a56a975-7244-4a50-9f2c-4b7c49b2b4ac",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0935380828",
        "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
        "Code": "515874",
        "Hoten": "Anh Sơn",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "sonpham.design@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [
            {
                "Title": "Taza Skin Clinic ?à N?ng",
                "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Nha Trang",
                "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Gò V?p",
                "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Th? ??c",
                "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Qu?n 10",
                "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
                "Checked": true
            }
        ],
        "Diachi": [],
        "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
        "ListImage": [],
        "Profile": [],
        "Role": "admin",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2023-12-12T07:19:26.376Z",
        "UpdateAt": "2024-05-31T07:58:02.800Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "6b6292d1-84f5-43af-920f-ea812df614a2",
        "ref_id": "0",
        "gid": "",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0935670135",
        "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
        "Code": "563050",
        "Hoten": "Trần Mỹ Duyên",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "myduyen.cgo@tazagroup.vn",
        "Gioitinh": "",
        "EditChinhanhs": [
            {
                "Title": "Taza Skin Clinic ?à N?ng",
                "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Nha Trang",
                "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Gò V?p",
                "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Th? ??c",
                "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Qu?n 10",
                "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
                "Checked": true
            }
        ],
        "Diachi": [],
        "password": "$2b$10$YuEyU32KQxnI8JACV3/Ab.aSxLZilRAn1hcAmwBcUGJ2gp.t/7sI.",
        "ListImage": [],
        "Profile": [],
        "Role": "admin",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2023-12-12T07:18:24.127Z",
        "UpdateAt": "2024-05-31T07:58:38.118Z",
        "DeleteAt": null,
        "idCreate": null
    },
    {
        "id": "c47af21e-5d5a-490b-95f6-e86dacc21139",
        "ref_id": "0",
        "gid": "103386279635221088134",
        "fid": "",
        "zid": "",
        "pid": "",
        "SDT": "0977272967",
        "idGroup": "4817d73d-1eba-4a57-97f1-13452e175478",
        "Code": "604815",
        "Hoten": "Phạm Chí Kiệt",
        "Avatar": "",
        "Ngaysinh": null,
        "email": "chikiet88@gmail.com",
        "Gioitinh": "",
        "EditChinhanhs": [
            {
                "Title": "Taza Skin Clinic ?à N?ng",
                "id": "9887ad61-4b2c-4db1-83e6-570f33cb540a",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Nha Trang",
                "id": "e173b1c0-fbdb-4eeb-a00c-b56664068515",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Gò V?p",
                "id": "268b7a06-d2c5-4c98-af1d-334144ae280f",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Th? ??c",
                "id": "f54de1e1-66bd-4690-8015-ad7315d6f14e",
                "Checked": true
            },
            {
                "Title": "Taza Skin Clinic Qu?n 10",
                "id": "ca725bf4-4810-4ea2-8ef2-520b2a3121cc",
                "Checked": true
            }
        ],
        "Diachi": [],
        "password": "$2b$10$PdDd7L4QuFht5iqEMWkPmeIjweFGnp3b.TCtBdZfp/Rpu7fv71hY.",
        "ListImage": [],
        "Profile": [],
        "Role": "admin",
        "Phanquyen": [],
        "Menu": [],
        "fcmToken": [],
        "Type": "",
        "Ordering": 1,
        "idDelete": false,
        "Status": 0,
        "CreateAt": "2023-12-11T07:57:50.473Z",
        "UpdateAt": "2024-12-10T13:50:52.000Z",
        "DeleteAt": null,
        "idCreate": null
    }
]
export const Forms = [
    {
        "id": 1,
        "Title": "Họ Tên",
        "value": "Hoten",
        "Type": "text",
        "required": true,
        "isShow": true
    },
    {
        "id": 2,
        "Title": "Email",
        "value": "email",
        "Type": "select",
        "required": true,
        "isShow": true
    },
    {
        "id": 3,
        "Title": "SDT",
        "value": "SDT",
        "Type": "textarea",
        "required": false
    },
    {
        "id": 4,
        "Title": "Mật Khẩu",
        "value": "password",
        "Type": "radio",
        "required": true
    },
    {
        "id": 5,
        "Title": "Trạng Thái",
        "value": "Status",
        "Type": "toggle",
        "required": true
    }
]`;
  await generateFile(componentListFile, componentListContent);
  await generateFile(componentDetailFile, componentDetailContent);
  await generateFile(componentListHTMLFile, componentListHTMLContent);
  await generateFile(componentDetailHTMLFile, componentDetailHTMLContent);
  await generateFile(componentListCssFile, componentListCssContent);
  await generateFile(componentDetailCssFile, componentDetailCssContent);
  await generateFile(componentServiceFile, componentServiceContent);
  await generateFile(componentMockdataFile, componentMockdataContent);
}

