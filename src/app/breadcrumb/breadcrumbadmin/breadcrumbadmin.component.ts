import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbadmin',
  standalone:true,
  imports: [
    CommonModule
  ],
  templateUrl: './breadcrumbadmin.component.html',
  styleUrls: ['./breadcrumbadmin.component.css']
})
export class BreadcrumbadminComponent implements OnInit {
  @Input() Breadcrumb: any;
  constructor() { }
  ngOnInit() {
    console.log(this.Breadcrumb);
  }

}
