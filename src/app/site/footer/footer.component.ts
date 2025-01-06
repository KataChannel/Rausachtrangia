import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CauhinhService } from '../../cauhinh/cauhinh.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports:[
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Today:any= new Date()
  Footer:any[]=[]
  Visitors:any={}
  Detail:any={}
  Dangtruycap:any=Math.floor(Math.random() * 10)
  Homnay:any=Math.floor(Math.random() * 100)
  Trongthang:any=Math.floor(Math.random() * 100*30)
  Tongtruycap:any=Math.floor(Math.random() * 100*30*12)
  constructor(
    private sanitizer: DomSanitizer
  ) { }
  _CauhinhService: CauhinhService = inject(CauhinhService);
  _MainService: MainService = inject(MainService);
  async ngOnInit() {
    const IP = await this._MainService.getIP()
    await this._MainService.CreateIP(IP)
    // this.Visitors = await this._MainService.getAllVisitor()
    this.Visitors = await this._MainService.getVisitor()
    this.Detail = await this._CauhinhService.getCauhinhBySlug('footer')    
  }
  // GetVisitorsRealtime():any
  // {
  //   const currentTime = new Date();
  //   const count = this.Visitors.filter((v:any) => {
  //     const visitorDate = new Date(v.CreateAt);
  //     const timeDifference = (currentTime.getTime() - visitorDate.getTime()) / 1000; // in seconds
  //     return timeDifference < 180;
  //   })?.length;
  //   return count==0?1:count;
  // }

  
  // GetVisitorsToday():number
  // {
  //   return this.Visitors.filter((v:any) => {
  //     const visitorDate = new Date(v.CreateAt);
  //     return visitorDate.getDay() === this.Today.getDay();
  //   })?.length;
  // }
  // GetVisitorsMonth():number
  // {
  //   return this.Visitors.filter((v:any) => {
  //     const visitorDate = new Date(v.CreateAt);
  //     return visitorDate.getMonth() === this.Today.getMonth();
  //   })?.length;
  // }
  FilterFooter(items:any[],field:any,value:any)
  {
    return items.filter((v:any)=>v[field]==value)
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
