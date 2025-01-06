import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demosite',
  standalone:true,
  templateUrl: './demosite.component.html',
  styleUrls: ['./demosite.component.css']
})
export class DemositeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const breadcrumb = this.route.snapshot.data['breadcrumb'];
    console.log(breadcrumb); // 'Trang Chủ'
  }

}
