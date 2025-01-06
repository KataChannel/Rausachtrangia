import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagetooltip',
  standalone:true,
  imports:[],
  templateUrl: './imagetooltip.component.html',
  styleUrls: ['./imagetooltip.component.css']
})
export class ImagetooltipComponent implements OnInit {
  @Input() imageUrl: string='';
  constructor() { }

  ngOnInit() {
  }

}
