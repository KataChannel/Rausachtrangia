import { Route } from '@angular/router';
import { AdminChuongtrinhkhuyenmaiComponent } from './admin/main-admin/admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.component';
import { AdminKhachhangComponent } from './admin/main-admin/admin-khachhang/admin-khachhang.component';
import { AdminLienheChitietComponent } from './admin/main-admin/admin-lienhe/admin-lienhe-chitiet/admin-lienhe-chitiet.component';
import { AdminLienheComponent } from './admin/main-admin/admin-lienhe/admin-lienhe.component';
import { DanhmucChitietComponent } from './admin/main-admin/danhmuc/danhmuc-chitiet/danhmuc-chitiet.component';
import { DanhmucComponent } from './admin/main-admin/danhmuc/danhmuc.component';
import { DashboardComponent } from './admin/main-admin/dashboard/dashboard.component';
import { DonhangAdminChitietComponent } from './admin/main-admin/donhang-admin/donhang-admin-chitiet/donhang-admin-chitiet.component';
import { DonhangAdminComponent } from './admin/main-admin/donhang-admin/donhang-admin.component';
import { AdminuserDetailComponent } from './admin/users/adminuser/adminuser-detail/adminuser-detail.component';
import { AdminuserComponent } from './admin/users/adminuser/adminuser.component';
import { AuthGuard } from './admin/users/auth/guards/auth.guard';
import { GuestGuard } from './admin/users/auth/guards/guest.guard';
import { DangkyComponent } from './admin/users/dangky/dangky.component';
import { DangnhapComponent } from './admin/users/dangnhap/dangnhap.component';
import { CauhinhadminComponent } from './cauhinh/cauhinhadmin/cauhinhadmin.component';
import { CauhinhadmindetailComponent } from './cauhinh/cauhinhadmin/cauhinhadmindetail/cauhinhadmindetail.component';
import { DemoadminComponent } from './demo/demoadmin/demoadmin.component';
import { DemoadmindetailComponent } from './demo/demoadmin/demoadmindetail/demoadmindetail.component';
import { moduleadminComponent } from './module/moduleadmin/moduleadmin.component';
import { PageadminComponent } from './page/pageadmin/pageadmin.component';
import { SanphamAdminComponent } from './sanpham/sanphamadmin/sanphamadmin.component';
import { SanphamAdminDetailComponent } from './sanpham/sanphamadmin/sanphamadmindetail/sanphamadmindetail.component';
import { MainComponent } from './site/main/main.component';
import { SlideadminComponent } from './slide/slideadmin/slideadmin.component';
import { SlideadminChitietComponent } from './slide/slideadmin/slideadmindetail/slideadmindetail.component';
import { UsergroupadminComponent } from './usergroup/usergroupadmin/usergroupadmin.component';
import { UsergroupChitietComponent } from './usergroup/usergroupadmin/usergroupadmindetail/usergroupadmindetail.component';
import { ListUsersComponent } from './admin/users/listusers/listusers.component';
export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    {
        path: 'demoteamplate',
        data: { breadcrumb:[{title: 'Trang Chủ'}]},
        loadComponent: () => import('./demo/demosite/demosite.component').then(comp => comp.DemositeComponent)
    },
    {
        path: 'admin/donhang/in/:id',
        loadComponent: () => import('../formin/formin-admin/chitietin/chitietin.component').then(comp => comp.ChitietinComponent)
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                title: 'Rau Sạch Trần Gia',
                data: { breadcrumb:[
                    {title: 'Trang Chủ',Slug: ''}
                ]},
                loadComponent: () => import('./site/trangchu/trangchu.component').then(comp => comp.TrangchuComponent)
            },
            {
                path: 'gio-hang',
                title: 'Giỏ Hàng',
                data: { breadcrumb:[
                    {title: 'Giỏ hàng',Slug: 'gio-hang'}
                ]},
                loadComponent: () => import('./admin/main-admin/website/giohang/giohang.component').then(comp => comp.GiohangComponent)
            },
            {
                path: 'thanh-toan',
                title: 'Thanh Toán',
                data: { breadcrumb:[
                    {title: 'Thanh toán',Slug: 'thanh-toan'}
                ]},
                loadComponent: () => import('./admin/main-admin/website/thanhtoan/thanhtoan.component').then(comp => comp.ThanhtoanComponent)
            },
            {
                path: 'don-hang',
                data: { breadcrumb:[
                    {title: 'Đơn hàng',Slug: 'don-hang'}
                ]},
                loadComponent: () => import('./admin/donhang/site/donhang/donhang.component').then(comp => comp.DonhangComponent),
                title: 'Đơn Hàng'
            },
            {
                path: 'cam-on',
                title: 'Cảm Ơn',
                data: { breadcrumb:[
                    {title: 'Cảm ơn',Slug: 'cam-on'}
                ]},
                loadComponent: () => import('./admin/main-admin/website/camon/camon.component').then(comp => comp.CamonComponent)
            },
            {
                path: 'san-pham-yeu-thich',
                title: 'Sản Phẩm Yêu Thích',
                loadComponent: () => import('./admin/main-admin/website/sanphamyeuthich/sanphamyeuthich.component').then(comp => comp.SanphamyeuthichComponent)
            },
            {
                path: 'danh-muc/:slug',
                title: 'Danh Mục',
                loadComponent: () => import('./site/sanpham/list-sanpham/list-sanpham.component').then(comp => comp.ListSanphamComponent),
            },
            {
                path: 'danh-muc',
                title: 'Danh Mục',
                loadComponent: () => import('./site/sanpham/list-sanpham/list-sanpham.component').then(comp => comp.ListSanphamComponent)
            },
            {
                path: 'san-pham/:slug',
                title: 'Chi Tiết',
                loadComponent: () => import('./site/sanpham/detail-sanpham/detail-sanpham.component').then(comp => comp.DetailSanphamComponent)
            },
            {
                path: 'blog/:danhmuc/:slug',
                loadComponent: () => import('./site/baiviet/blog-detail/blog-detail.component').then(comp => comp.BlogDetailComponent)
            },
            {
                path: 'blog/:danhmuc',
                loadComponent: () => import('./site/baiviet/blog/blog.component').then(comp => comp.BlogComponent)
            },
            {
                path: 'lien-he',
                title: 'Liên hệ',
                data: { slug: 've-chung-toi' },
                loadComponent: () => import('./admin/main-admin/website/contact/contact.component').then(comp => comp.ContactComponent)
            },
            {
                path: 'tra-cuu-don',
                title: 'Tra Cứu Đơn',
                loadComponent: () => import('./admin/main-admin/website/tracuudon/tracuudon.component').then(comp => comp.TracuudonComponent)
            },
            {
                path: 'profile',
                redirectTo:'profile/general',
                pathMatch:'full'
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                loadComponent: () => import('./admin/users/profile/profile.component').then(c => c.ProfileComponent),
                children:[
                    {
                        path:'general',
                        loadComponent: () => import('./admin/users/profile/general/general.component').then(c => c.GeneralComponent),
                    },
                    {
                        path:'changepassword',
                        loadComponent: () => import('./admin/users/profile/changepassword/changepassword.component').then(c => c.ChangepasswordComponent),
                    },
                    {
                        path:'social',
                        loadComponent: () => import('./admin/users/profile/social/social.component').then(c => c.SocialComponent),
                    },
                    {
                        path:'myorder',
                        loadComponent: () => import('./admin/users/profile/listmyorder/listmyorder.component').then(c => c.ListmyorderComponent),
                        children:[
                            {
                                path:':id',
                                loadComponent: () => import('./admin/users/profile/listmyorder/detailmyorder/detailmyorder.component').then(c => c.DetailMyorderComponent),
                            }
                        ]
                    },

                ]

            },
        ]
    },
    //{ path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadComponent: () => import('./admin/main-admin/main-admin.component').then(c => c.MainAdminComponent),
        children: [
            
            {
                path: 'menu',
                loadComponent: () => import('./admin/menu/menu-admin/menu-admin.component').then(c => c.MenuAdminComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/menu/menu-admin/menu-admin-chitiet/menu-admin-chitiet.component').then(c => c.MenuAdminChitietComponent),
                    },
                ]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'module',
                component: moduleadminComponent,
            },
            {
                path: 'page',
                component: PageadminComponent,
            },
            {
                path: 'sanpham',
                loadComponent: () => import('./admin/sanpham/listsanpham/listsanpham.component').then(c => c.ListsanphamComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin/sanpham/listsanpham/listsanpham.component').then(c => c.ListsanphamComponent),
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/sanpham/listsanpham/detailsanpham/detailsanpham.component').then(c => c.DetailSanphamComponent),
                    },
                ]

            },
            {
                path: 'donhang',
                loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then(c => c.ListdonhangComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then(c => c.ListdonhangComponent),
                    },
                    {
                        path: 'donsi/:id',
                        loadComponent: () => import('./admin/donhang/listdonhang/listdonsi/detaildonsi/detaildonsi.component').then(c => c.DetaildonsiComponent),
                    },
                    {
                        path: 'donle/:id',
                        loadComponent: () => import('./admin/donhang/listdonhang/listdonle/listdonle.component').then(c => c.ListdonleComponent),
                    },
                ]
            },
            {
                path: 'banggia',
                loadComponent: () => import('./admin/banggia/listbanggia/listbanggia.component').then(c => c.ListBanggiaComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/banggia/listbanggia/detailbanggia/detailbanggia.component').then(c => c.DetailBanggiaComponent),
                    },
                ]
            },
            {
                path: 'khachhang',
                loadComponent:() => import('./admin/khachhang/listkhachhang/listkhachhang.component').then(c => c.ListkhachhangComponent),
                children: [
                    {
                        path: '',
                        loadComponent:() => import('./admin/khachhang/listkhachhang/listkhachhang.component').then(c => c.ListkhachhangComponent),
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/khachhang/listkhachhang/detailkhachhang/detailkhachhang.component').then(c => c.DetailKhachhangComponent),
                    }
                ]
            },
            {
                path: 'vandon',
                loadComponent: () => import('./admin/donhang/vandon/vandon.component').then(c => c.VandonComponent),
            },
            {
                path: 'xuatnhapton',
                loadComponent: () => import('./admin/xuatnhapton/listxuatnhapton/listxuatnhapton.component').then(c => c.ListXuatnhaptonComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/xuatnhapton/listxuatnhapton/detailxuatnhapton/detailxuatnhapton.component').then(c => c.DetailXuatnhaptonComponent),
                    }
                ]
            },
            {
                path: 'dathangncc',
                loadComponent: () => import('./admin/dathangncc/listdathangncc/listdathangncc.component').then(c => c.ListDathangnccComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin/dathangncc/listdathangncc/listdathangncc.component').then(c => c.ListDathangnccComponent),
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/dathangncc/listdathangncc/detaildathangncc/detaildathangncc.component').then(c => c.DetailDathangnccComponent),
                    }
                ]
            },
            {
                path: 'nhacungcap',
                loadComponent: () => import('./admin/nhacungcap/listnhacungcap/listnhacungcap.component').then(c => c.ListNhacungcapComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin/nhacungcap/listnhacungcap/listnhacungcap.component').then(c => c.ListNhacungcapComponent),
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/nhacungcap/listnhacungcap/detailnhacungcap/detailnhacungcap.component').then(c => c.DetailNhacungcapComponent),
                    }
                ]
            },
            {
                path: 'user',
                loadComponent: () => import('./admin/users/listusers/listusers.component').then(c => c.ListUsersComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () => import('./admin/users/listusers/detailusers/detailusers.component').then(c => c.DetailUsersComponent),
                    }
                ]
            },
            // {
            //     path: 'giohang',
            //     component: DonhangAdminComponent,
            //     children: [
            //         {
            //             path: ':id',
            //             component: DonhangAdminChitietComponent,
            //         },
            //     ]
            // },
            {
                path: 'slide',
                component: SlideadminComponent,
                children: [
                    {
                        path: ':id',
                        component: SlideadminChitietComponent,
                    },
                ]
            },
            // {
            //     path: 'sanpham',
            //     component: SanphamAdminComponent,
            //     children: [
            //         {
            //             path: ':id',
            //             component: SanphamAdminDetailComponent,
            //         },
            //     ]
            // },
            {
                path: 'danhmuc',
                component: DanhmucComponent,
                children: [
                    {
                        path: ':id',
                        component: DanhmucChitietComponent,
                    },
                ]
            },
            {
                path: 'lienhe',
                component: AdminLienheComponent,
                children: [
                    {
                        path: ':id',
                        component: AdminLienheChitietComponent,
                    }
                ]
            },
            {
                path: 'khuyenmai',
                component: AdminChuongtrinhkhuyenmaiComponent,
            },
            {
                path: 'user',
                loadComponent: () => import('./baiviet/baivietadmin/baivietadmin.component').then(c => c.BaivietAdminComponent),
                children: [
                    {
                        path: ':id',
                        loadComponent: () => import('./baiviet/baivietadmin/baivietadminchitiet/baivietadminchitiet.component').then(c => c.BaivietadminChitietComponent),
                    }
                ]
            },
            {
                path: 'usergroup',
                component: UsergroupadminComponent,
                children: [
                    {
                        path: ':id',
                        component: UsergroupChitietComponent
                    }
                ]
            },
            {
                path: 'demo',
                component: DemoadminComponent,
                children: [
                    {
                        path: ':id',
                        component: DemoadmindetailComponent
                    }
                ]
            },
            {
                path: 'cauhinh',
                component: CauhinhadminComponent,
                children: [
                    { path: ':id', component: CauhinhadmindetailComponent }
                ]
            },
        ]
    },
    {
        path: 'dangnhap',
        canActivate: [GuestGuard],
        loadComponent: () => import('./admin/users/dangnhap/dangnhap.component').then((c) => c.DangnhapComponent),
    },
    {
        path: 'dangky',
        canActivate: [GuestGuard],
        loadComponent: () => import('./admin/users/dangky/dangky.component').then((c) => c.DangkyComponent),
    },
];
