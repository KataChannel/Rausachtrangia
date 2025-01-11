import { capitalize } from "@angular-devkit/core/src/utils/strings";
import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function kataDashboardSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const currentPath = _options.path || '/src/app'; 
    const fileName = _options.name || "dashboard";

//component.ts
tree.create( 
    `${currentPath}/${fileName}/${fileName}.component.ts`,
`import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Config, TREE_DATA, User } from './adminmain';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-${fileName}',
  imports: [
    MatTreeModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './${fileName}.component.html',
  styleUrl: './${fileName}.component.scss'
})
export class ${capitalize(fileName)}Component {
  showFiller = false;
  Config:any =Config
  User:any =User
  folders: any[] =  folders
  notes: any[] = notes
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: any) => node.expandable;
}
`);
    tree.create(
      `${currentPath}/${fileName}/${fileName}.html`,
      `
<mat-drawer-container class="!w-screen !h-screen" autosize>
    <mat-drawer #drawer class="" mode="side" opened="true" position="start">
        <div class="relative h-full flex flex-col space-y-2">
            <div class="relative flex flex-col space-y-2 p-2">
                <img [src]="Config.Logoimage" class="max-h-10 object-cover"  alt="Logo">
            </div>
            <div class="relative h-full flex flex-col space-y-2 overflow-auto p-2">
                <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
                    <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
                      <button mat-icon-button disabled></button>
                      {{node.name}}
                    </mat-tree-node>
                    <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding matTreeNodeToggle
                                   [cdkTreeNodeTypeaheadLabel]="node.name">
                      <button mat-icon-button matTreeNodeToggle
                              [attr.aria-label]="'Toggle ' + node.name">
                        <mat-icon class="mat-icon-rtl-mirror">
                          {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
                        </mat-icon>
                      </button>
                      {{node.name}}
                    </mat-tree-node>
                  </mat-tree> 
            </div>
            <div class="relative w-full justify-between flex flex-row space-x-2 items-center p-2">
              <div class="flex flex-row space-x-2">
                <img [src]="User.Avatar" alt="Avatar" class="max-w-14 max-h-14 object-cover rounded-full">
                <div class="flex flex-col">
                    <div class="font-bold">{{User.Hoten}}</div>
                    <div class="italic text-xs">{{User.Vitri}}</div>
                </div>
              </div>
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item>
                    <mat-icon>logout</mat-icon>
                    <span>Logout</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>account_circle</mat-icon>
                    <span>Profile</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>settings</mat-icon>
                    <span>Settings</span>
                  </button>
                </mat-menu>
            </div>
        </div>
    </mat-drawer>
  
    <div class="relative flex flex-col w-full h-full">
      <div class="relative flex flex-row space-x-2 justify-between items-center p-2 bg-gray-100">
       <div class="flex flex-row space-x-2 items-center">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <div class="relative max-w-xl flex flex-row items-center">
            <input type="text"
                placeholder="Tìm Kiếm..."
                class="block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="material-symbols-outlined text-gray-500">search</span>
            </div>
        </div> 
       </div>
        <div class="flex flex-row space-x-2 items-center">
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>dashboard</mat-icon>
          </button>
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>chat</mat-icon>
          </button>
          <button mat-icon-button (click)="drawer.toggle()" [matMenuTriggerFor]="menu1">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu1="matMenu">
            <mat-tab-group (click)="$event.stopPropagation()">
              <mat-tab label="Profile"> 
                <mat-list>
                  <div mat-subheader>Folders</div>
                  @for (folder of folders; track folder) {
                    <mat-list-item>
                      <mat-icon matListItemIcon>folder</mat-icon>
                      <div matListItemTitle>{{folder.name}}</div>
                      <div matListItemLine>{{folder.updated | date}}</div>
                    </mat-list-item>
                  }
                  <mat-divider></mat-divider>
                  <div mat-subheader>Notes</div>
                  @for (note of notes; track note) {
                    <mat-list-item>
                      <mat-icon matListItemIcon>note</mat-icon>
                      <div matListItemTitle>{{note.name}}</div>
                      <div matListItemLine>{{note.updated | date}}</div>
                    </mat-list-item>
                  }
                </mat-list>
                
                 </mat-tab>
              <mat-tab label="Settings"> 
                <mat-list>
                  <div mat-subheader>Notes</div>
                  @for (note of notes; track note) {
                    <mat-list-item>
                      <mat-icon matListItemIcon>note</mat-icon>
                      <div matListItemTitle>{{note.name}}</div>
                      <div matListItemLine>{{note.updated | date}}</div>
                    </mat-list-item>
                  }
                </mat-list>
              </mat-tab>
            </mat-tab-group>
          </mat-menu>
          
        </div>
      </div>
      <router-outlet></router-outlet>   
    </div>
  </mat-drawer-container>
      `
    );

    tree.create(
      `${currentPath}/${fileName}/${fileName}.ts`,
      `
export const Config:any={
    Logoimage:"logo/logo.png"
}
export const User:any={
    Avatar:"logo/logo.png",
    Hoten:"Phạm Chí Kiệt",
    Vitri:"Leader IT"
}
export const TREE_DATA: any[] = [
    {
      name: 'Fruit',
      children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
        },
        {
          name: 'Orange',
          children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
        },
      ],
    },
  ];
  export const folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  export const notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
      `
    );

    tree.create(
      `${currentPath}/${fileName}/${fileName}.component.scss`,
      ``
    );
    return tree;
  };
}
