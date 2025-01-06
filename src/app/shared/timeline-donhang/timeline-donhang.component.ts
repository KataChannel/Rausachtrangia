import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-donhang',
  standalone:true,
  imports:[],
  templateUrl: './timeline-donhang.component.html',
  styleUrls: ['./timeline-donhang.component.css']
})
export class TimelineDonhangComponent implements OnInit {

  constructor() { }
  @Input() Status:any =0
  ListTrangThaiDonhang: any[] = [
    {id:0,Title:"Đơn Mới",    Class:"text-white bg-blue-300"},
    {id:1,Title:"Xác Nhận",   Class:"text-white bg-cyan-500"},
    {id:2,Title:"Đang xử lý", Class:"text-white bg-blue-500"},
    {id:3,Title:"Đang Giao",  Class:"text-white bg-yellow-400"},
    {id:4,Title:"Hoàn Thành", Class:"text-white bg-green-400"},
    {id:5,Title:"Huỷ",        Class:"text-white bg-red-400"}
  ]
  ngOnInit() {}
}
