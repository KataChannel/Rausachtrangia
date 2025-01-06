import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baiviet-chitiet',
  templateUrl: './baiviet-chitiet.component.html',
  styleUrls: ['./baiviet-chitiet.component.css']
})
export class BaivietChitietComponent implements OnInit {
  Detail:any={id:1,Title:'Cung cấp nông sản hữu cơ',Slug:'baiviet1',
  Image:{Main:'https://timona.di4lsell.com/uploads/322/service/22/10/1665652638.'},
  Mota:'<p dir="ltr" style="text-align:justify">Đại diện cho một doanh nghiệp về nông nghiệp và sản xuất, chúng tôi nhận thức được sứ mệnh và trách nhiệm trong việc góp phần thúc đẩy sự phát triển an toàn lương thực tại Việt Nam và khu vực.&nbsp;</p><p dir="ltr" style="text-align:justify">Thấu hiểu được giá trị cốt lõi của ngành nông nghiệp đối với nền kinh tế và là nghề đặc trưng mang nét văn hoá truyền thống của người Việt đi cùng thời gian. Chúng tôi luôn tự hào và duy trì việc phát triển, canh tác hoà hợp với thiên nhiên tạo nên nền tảng vững chắc.&nbsp;</p><p dir="ltr" style="text-align:justify">Không dừng lại ở đó, chúng tôi còn không ngừng nỗ lực nâng cao chất lượng sản phẩm, giá trị dịch vụ, đồng thời xây dựng một môi trường làm việc công bằng, chuyên nghiệp, khuyến khích sáng tạo, trung thực và minh bạch.</p>'}
  constructor() { }

  ngOnInit() {
  }

}
