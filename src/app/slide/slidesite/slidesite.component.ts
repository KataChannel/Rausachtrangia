import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Autoplay]); // Khai báo các module đã import
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-slidesite',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slidesite.component.html',
  styleUrls: ['./slidesite.component.css']
})
export class SlidesiteComponent implements OnInit {
  @Input() Config:any={}
  @Input() Detail:any={}
  constructor() {
   }
   ngOnInit() {

  }
  ngAfterViewInit()
  {
    // console.log(this.Detail.Title,this.Config);
    register();
    //this.initializeSwiper();
  }
  GetID(item:any)
  {
    return item.slice(0,4)
  }
  getSwiperConfig() {
    return {
      modules: [Pagination,Navigation],
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      navigation:true,
      slidesPerView:this.Detail.Config.default,
      spaceBetween: 10,
      speed:1000,
      loop:true,
      autoplay:{
        delay:5000
      },
      breakpoints: {
        640: {
          slidesPerView:  this.Detail.Config.xs,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: this.Detail.Config.md,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: this.Detail.Config.lg,
          spaceBetween: 10,
        },
      },
    };
  }

  // initializeSwiper = () => {
  //   if (!this.Config || !this.Config.slidesPerView) {
  //     console.error('Config or slidesPerView is not defined');
  //     return;
  //   }
  //   const swiper = new Swiper('.mySwiper'+this.GetID(this.Detail.id), this.getSwiperConfig());
  //   // console.log(this.Detail.Title,this.getSwiperConfig());
    
  // }
}

