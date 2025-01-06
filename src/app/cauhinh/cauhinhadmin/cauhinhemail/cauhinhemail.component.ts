import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-cauhinhemail',
  standalone:true,
  imports:[
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './cauhinhemail.component.html',
  styleUrls: ['./cauhinhemail.component.css']
})
export class CauhinhemailComponent implements OnInit {
  @Input() Dulieu:any
  @Output() UploadDulieu = new EventEmitter();
  constructor() { console.log(this.Dulieu) }

  ngOnInit() {}
  UpdateDulieu()
  {
    console.log(this.Dulieu);
    
    this.UploadDulieu.emit(this.Dulieu);
  }

}
