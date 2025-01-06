import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-customtable',
  standalone:true,
  imports:[
    MatInputModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule
    ],
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {
  displayedColumns: any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() Dulieus:any[]=[]
  @Input() Data:any
  constructor() {}

  ngOnInit() {
    if(this.Dulieus.length>0)
    {
      this.displayedColumns = Object.keys(this.Dulieus[0]);
      this.dataSource = new MatTableDataSource(this.Dulieus);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    }

  }
  ngAfterViewInit(): void {
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
