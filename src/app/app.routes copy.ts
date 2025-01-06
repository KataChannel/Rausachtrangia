// import { Route } from '@angular/router';
// import { MainComponent } from './site/main/main.component';
// import { ListSanphamComponent } from './site/sanpham/list-sanpham/list-sanpham.component';
// import { DetailSanphamComponent } from './site/sanpham/detail-sanpham/detail-sanpham.component';
// import { TrangchuComponent } from './site/trangchu/trangchu.component';
// import { MainAdminComponent } from './admin/main-admin/main-admin.component';
// import { ContactComponent } from './admin/main-admin/website/contact/contact.component';
// import { GiohangComponent } from './admin/main-admin/website/giohang/giohang.component';
// import { SanphamComponent } from './admin/main-admin/sanpham/sanpham.component';
// import { SanphamChitietComponent } from './admin/main-admin/sanpham/sanpham-chitiet/sanpham-chitiet.component';
// import { DanhmucComponent } from './admin/main-admin/danhmuc/danhmuc.component';
// import { DanhmucChitietComponent } from './admin/main-admin/danhmuc/danhmuc-chitiet/danhmuc-chitiet.component';
// import { DashboardComponent } from './admin/main-admin/dashboard/dashboard.component';
// import { SanphamyeuthichComponent } from './admin/main-admin/website/sanphamyeuthich/sanphamyeuthich.component';
// import { ThanhtoanComponent } from './admin/main-admin/website/thanhtoan/thanhtoan.component';
// import { DonhangAdminComponent } from './admin/main-admin/donhang-admin/donhang-admin.component';
// import { DonhangComponent } from './admin/main-admin/website/donhang/donhang.component';
// import { CamonComponent } from './admin/main-admin/website/camon/camon.component';
// import { TracuudonComponent } from './admin/main-admin/website/tracuudon/tracuudon.component';
// import { DonhangAdminChitietComponent } from './admin/main-admin/donhang-admin/donhang-admin-chitiet/donhang-admin-chitiet.component';
// import { AuthGuard } from './admin/users/auth/guards/auth.guard';
// import { DangnhapComponent } from './admin/users/dangnhap/dangnhap.component';
// import { DangkyComponent } from './admin/users/dangky/dangky.component';
// import { GuestGuard } from './admin/users/auth/guards/guest.guard';
// import { ProfileComponent } from './admin/users/profile/profile.component';
// import { BlogComponent } from './site/baiviet/blog/blog.component';
// import { BlogDetailComponent } from './site/baiviet/blog-detail/blog-detail.component';
// import { KhuyenmaiChitietComponent } from './site/baiviet/khuyenmai/khuyenmai-chitiet/khuyenmai-chitiet.component';
// import { KhuyenmaiComponent } from './site/baiviet/khuyenmai/khuyenmai.component';
// import { AdminuserComponent } from './admin/users/adminuser/adminuser.component';
// import { AdminuserDetailComponent } from './admin/users/adminuser/adminuser-detail/adminuser-detail.component';
// import { AdminLienheChitietComponent } from './admin/main-admin/admin-lienhe/admin-lienhe-chitiet/admin-lienhe-chitiet.component';
// import { AdminLienheComponent } from './admin/main-admin/admin-lienhe/admin-lienhe.component';
// import { AdminKhachhangComponent } from './admin/main-admin/admin-khachhang/admin-khachhang.component';
// import { AdminChuongtrinhkhuyenmaiComponent } from './admin/main-admin/admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.component';
// import { AdminTonkhoComponent } from './admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho.component';
// import { AdminTonkhoChitietComponent } from './admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho-chitiet/admin-tonkho-chitiet.component';
// import { MenuAdminComponent } from './admin/menu/menu-admin/menu-admin.component';
// import { MenuAdminChitietComponent } from './admin/menu/menu-admin/menu-admin-chitiet/menu-admin-chitiet.component';
// import { DemoadminComponent } from './demo/demoadmin/demoadmin.component';
// import { DemoadmindetailComponent } from './demo/demoadmin/demoadmindetail/demoadmindetail.component';
// import { CauhinhadminComponent } from './cauhinh/cauhinhadmin/cauhinhadmin.component';
// import { CauhinhadmindetailComponent } from './cauhinh/cauhinhadmin/cauhinhadmindetail/cauhinhadmindetail.component';
// import { UsergroupadminComponent } from './usergroup/usergroupadmin/usergroupadmin.component';
// import { UsergroupChitietComponent } from './usergroup/usergroupadmin/usergroupadmindetail/usergroupadmindetail.component';
// import { DemositeComponent } from './demo/demosite/demosite.component';
// import { SlideadminComponent } from './slide/slideadmin/slideadmin.component';
// import { SlideadminChitietComponent } from './slide/slideadmin/slideadmindetail/slideadmindetail.component';
// import { BaivietAdminComponent } from './baiviet/baivietadmin/baivietadmin.component';
// import { SanphamAdminComponent } from './sanpham/sanphamadmin/sanphamadmin.component';
// import { SanphamAdminDetailComponent } from './sanpham/sanphamadmin/sanphamadmindetail/sanphamadmindetail.component';
// import { BaivietadminChitietComponent } from './baiviet/baivietadmin/baivietadminchitiet/baivietadminchitiet.component';
// import { ChitietinComponent } from '../formin/formin-admin/chitietin/chitietin.component';
// import { PageadminComponent } from './page/pageadmin/pageadmin.component';
// import { moduleadminComponent } from './module/moduleadmin/moduleadmin.component';

// export const appRoutes: Route[] = [
//     // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
//     { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
//     {
//         path: 'demoteamplate',
//         component: DemositeComponent,
//         data: { title: 'Trang Chủ' }
//     },
//     {
//         path: 'admin/donhang/in/:id',
//         component: ChitietinComponent,
//     },
//     {
//         path: '',
//         component: MainComponent,
//         title: 'Main',
        
//         children: [
//                         {
//                 path: '',
//                 component: TrangchuComponent,
//                 title: 'Trang Chủ'
//             },
//             {
//                 path: 'gio-hang',
//                 component: GiohangComponent,
//                 title: 'Giỏ Hàng'
//             },
//             {
//                 path: 'thanh-toan',
//                 component: ThanhtoanComponent,
//                 title: 'Thanh Toán'
//             },
//             {
//                 path: 'don-hang',
//                 component: DonhangComponent,
//                 title: 'Đơn Hàng'
//             },
//             {
//                 path: 'cam-on',
//                 component: CamonComponent,
//                 title: 'Cảm Ơn'
//             },
//             {
//                 path: 'san-pham-yeu-thich',
//                 component: SanphamyeuthichComponent,
//                 title: 'Sản Phẩm Yêu Thích'
//             },
//             {
//                 path: 'danh-muc/:slug',
//                 component: ListSanphamComponent,
//                 title: 'Danh Mục'
//             },
//             {
//                 path: 'danh-muc',
//                 component: ListSanphamComponent,
//                 title: 'Danh Mục'
//             },
//             {
//                 path: 'san-pham/:slug',
//                 component: DetailSanphamComponent,
//                 title: 'Chi Tiết'
//             },
//             {
//                 path: 'blog/:danhmuc/:slug',
//                 component: BlogDetailComponent,
//             },
//             {
//                 path: 'blog/:danhmuc',
//                 component: BlogComponent,
//             },
//             // {
//             //     path: 'khuyen-mai',
//             //     component: KhuyenmaiComponent,
//             // },
//             // {
//             //     path: 'khuyen-mai/:slug',
//             //     component: KhuyenmaiChitietComponent,
//             // },
//             // {
//             //     path: 'mon-ngon-moi-ngay',
//             //     component: BlogComponent,
//             //     data: { type: 'mon-ngon-moi-ngay' }
//             // },
//             // {
//             //     path: 'mon-ngon-moi-ngay/:slug',
//             //     component: BlogDetailComponent,
//             // },
//             // {
//             //     path: 'tin-tuc',
//             //     component: BlogComponent,
//             //     data: { type: 'tin-tuc' }
//             // },
//             // {
//             //     path: 'tin-tuc/:slug',
//             //     component: BlogDetailComponent,
//             // },
//             // {
//             //     path: 'gioi-thieu-chung',
//             //     component: GioithieuchungComponent,
//             //     data: { slug: 've-chung-toi' } 
//             // },
//             {
//                 path: 'lien-he',
//                 component: ContactComponent,
//                 data: { slug: 've-chung-toi' }
//             },
//             {
//                 path: 'tra-cuu-don',
//                 component: TracuudonComponent,
//             },
//             {
//                 path: 'dangnhap',
//                 canActivate: [GuestGuard],
//                 component: DangnhapComponent,
//             },
//             {
//                 path: 'dangky',
//                 canActivate: [GuestGuard],
//                 component: DangkyComponent,
//             },
//             {
//                 path: 'profile',
//                 canActivate: [AuthGuard],
//                 component: ProfileComponent,
//             },
//         ]
//     },
//     {
//         path: 'admin',
//         canActivate: [AuthGuard],
//         component: MainAdminComponent,
//         children: [
//             {
//                 path: 'menu',
//                 component: MenuAdminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: MenuAdminChitietComponent,
//                     },
//                 ]
//             },
//             {
//                 path: 'dashboard',
//                 component: DashboardComponent,
//             },
//             {
//                 path: 'module',
//                 component: moduleadminComponent,
//             },
//             {
//                 path: 'page',
//                 component: PageadminComponent,
//             },
//             {
//                 path: 'donhang',
//                 component: DonhangAdminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: DonhangAdminChitietComponent,
//                     },
//                 ]
//             },
//             {
//                 path: 'slide',
//                 component: SlideadminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: SlideadminChitietComponent,
//                     },
//                 ]
//             },
//             {
//                 path: 'khachhang',
//                 component: AdminKhachhangComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: DonhangAdminChitietComponent,
//                     },
//                 ]
//             },
//             {
//                 path: 'sanpham',
//                 component: SanphamAdminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: SanphamAdminDetailComponent,
//                     },
//                 ]
//             },
//             {
//                 path: 'danhmuc',
//                 component: DanhmucComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: DanhmucChitietComponent,
//                     },
//                 ]
//             },

//             {
//                 path: 'baiviet',
//                 component: BaivietAdminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: BaivietadminChitietComponent,
//                     }
//                 ]
//             },
//             {
//                 path: 'lienhe',
//                 component: AdminLienheComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: AdminLienheChitietComponent,
//                     }
//                 ]
//             },
//             {
//                 path: 'khuyenmai',
//                 component: AdminChuongtrinhkhuyenmaiComponent,
//                 // children:[
//                 //     {
//                 //         path: ':id',
//                 //         component: AdminLienheChitietComponent,
//                 //     }
//                 // ]
//             },
//             {
//                 path: 'user',
//                 component: AdminuserComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: AdminuserDetailComponent
//                     }
//                 ]
//             },
//             {
//                 path: 'usergroup',
//                 component: UsergroupadminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component:UsergroupChitietComponent
//                     }
//                 ]
//             },
//             {
//                 path: 'demo',
//                 component: DemoadminComponent,
//                 children: [
//                     {
//                         path: ':id',
//                         component: DemoadmindetailComponent
//                     }
//                 ]
//             },
//             {
//                 path: 'tonkho',
//                 component: AdminTonkhoComponent,
//                 children: [
//                     { path: ':id', component: AdminTonkhoChitietComponent }
//                 ]
//             },
//             {
//                 path: 'cauhinh',
//                 component: CauhinhadminComponent,
//                 children: [
//                     { path: ':id', component: CauhinhadmindetailComponent }
//                 ]
//             },
//         ]
//     },
// ];
