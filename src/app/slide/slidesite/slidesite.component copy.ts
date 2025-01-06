// import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
// import Swiper, { Pagination } from 'swiper';
// @Component({
//   selector: 'app-slidesite',
//   standalone: true,
//   imports: [],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   templateUrl: './slidesite.component.html',
//   styleUrls: ['./slidesite.component.css']
// })
// export class SlidesiteComponent implements OnInit {
//   images:any=[
//     {id:1, url:"http://localhost:6100/assets/images/slide.jpg"},
//     {id:2, url:"http://localhost:6100/assets/images/slide.jpg"},
//     {id:3, url:"http://localhost:6100/assets/images/slide.jpg"},
//     {id:4, url:"http://localhost:6100/assets/images/slide.jpg"},
//     {id:5, url:"http://localhost:6100/assets/images/slide.jpg"},
//     {id:6, url:"http://localhost:6100/assets/images/slide.jpg"},
//   ]
//   constructor() { }


//   ngOnInit() {
//   }
//   ngAfterViewInit(): void {
//     const swiper = new Swiper('.mySwiper', {
//       modules: [Pagination],
//       pagination: {
//         el: '.swiper-pagination',
//         clickable:true
//       },
//       navigation:true,
//       slidesPerView:1,
//       spaceBetween: 20,
//       speed:1000,
//       autoplay:{
//         delay:100
//       },
//       breakpoints: {
//         640: {
//           slidesPerView: 1,
//           spaceBetween: 20,
//         },
//         768: {
//           slidesPerView: 1,
//           spaceBetween: 40,
//         },
//         1024: {
//           slidesPerView: 1,
//           spaceBetween: 50,
//         },
//       },
//     });
//   }
// }


