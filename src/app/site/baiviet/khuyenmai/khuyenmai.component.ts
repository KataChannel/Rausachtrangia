import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-baiviet',
  standalone:true,
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css']
})
export class KhuyenmaiComponent implements OnInit {
  ListBaiviet:any[]=[
    {id:1,Title:'Cung cấp nông sản hữu cơ',Slug:'baiviet1',Image:{Main:'https://timona.di4lsell.com/uploads/322/service/22/10/1665652638.'},Mota:'Là hệ thống chuỗi nông nghiệp và thực phẩm hữu cơ của người Việt phát triển với mục tiêu thay đổi giá trị nông sản cho n...'},
    {id:1,Title:'Trang trại đạt chuẩn Organic',Slug:'baiviet1',Image:{Main:'https://timona.di4lsell.com/uploads/322/service/22/10/1665652490.'},Mota:'Đại diện cho một doanh nghiệp về nông nghiệp và sản xuất, chúng tôi nhận thức được sứ mệnh và trách nhiệm trong việc góp...'},
  ]
  constructor() { }

  ngOnInit() {
  }

}
