import { Tree } from "@angular-devkit/schematics";
export function createHtmlFiles(tree: Tree, currentPath: string, fileName: string) {
  tree.create(
    `${currentPath}/list${fileName}/list${fileName}.component.html`,
    `<mat-drawer-container class="w-full h-full" autosize>
  <mat-drawer #drawer class="flex flex-col lg:!w-1/3 !w-full h-full" [position]="'end'">    
    <router-outlet></router-outlet>
  </mat-drawer>

<div class="flex flex-col space-y-2 h-screen-12 w-full justify-between p-2">
    <div class="flex flex-col space-y-2 w-full p-2">
        <div class="cursor-pointer w-full relative grid lg:grid-cols-2 gap-2 justify-between items-center">
            <div class="w-full flex flex-row space-x-2 items-center">
                <div class="relative">
                    <input type="text" placeholder="Tìm Kiếm..." #input (keyup)="applyFilter($event)"
                        class="block pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span class="material-symbols-outlined text-gray-500">search</span>
                    </div>
                </div>
                <span (click)="Create()"
                    class="cursor-pointer material-symbols-outlined p-2 rounded-lg hover:bg-slate-100">add_circle</span>
            </div>
        </div>
        <div class="w-full">
            <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
                @for (column of displayedColumns; track column) {
                  <ng-container [matColumnDef]="column">
                    <th class="whitespace-nowrap" mat-header-cell *matHeaderCellDef mat-sort-header>{{ ColumnName[column] }}
                    </th>
                    <td class="whitespace-nowrap" mat-cell *matCellDef="let row;let idx = index">
                         {{ column === 'STT' ? idx + 1 : row[column] }}
                    </td>
                 </ng-container>
                }
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="goToDetail(row);"></tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" colspan="4">Không tìm thấy "{{input.value}}"</td>
                </tr>
            </table>
            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of ${fileName}s"></mat-paginator>
        </div>
    </div>    
</div>
</mat-drawer-container>`
  );

tree.create(
    `${currentPath}/list${fileName}/detail${fileName}/detail${fileName}.component.html`,
    `<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="_List${fileName}Component.drawer.close()">
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
    <div>Bạn chắc chắn muốn xoá không?</div>
    <div class="flex flex-row space-x-2 mt-4 items-center justify-center">
      <button mat-flat-button color="primary" (click)="isDelete=false">
        Đồng Ý
      </button>
      <button mat-flat-button color="warn" (click)="isDelete=false">
        Huỷ Bỏ
      </button>
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
</div>`
  );
}
