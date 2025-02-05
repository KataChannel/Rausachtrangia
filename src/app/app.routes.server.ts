import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'admin/donhang/in/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'danh-muc/:slug',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'san-pham/:slug',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'blog/:danhmuc/:slug',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'profile/myorder/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'blog/:danhmuc',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/menu/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/donhang/:id',
  //   renderMode: RenderMode.Server,
  // },
  // // {
  // //   path: 'admin/giohang/:id',
  // //   renderMode: RenderMode.Server,
  // // },
  // {
  //   path: 'admin/slide/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/khachhang/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/sanpham/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/danhmuc/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/baiviet/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/lienhe/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/user/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/usergroup/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/demo/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/tonkho/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'admin/cauhinh/:id',
  //   renderMode: RenderMode.Server,
  // },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
