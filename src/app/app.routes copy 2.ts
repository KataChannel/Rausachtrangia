import { Route } from '@angular/router';
import { AdminChuongtrinhkhuyenmaiComponent } from './admin/main-admin/admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.component';
import { AdminKhachhangComponent } from './admin/main-admin/admin-khachhang/admin-khachhang.component';
import { AdminLienheChitietComponent } from './admin/main-admin/admin-lienhe/admin-lienhe-chitiet/admin-lienhe-chitiet.component';
import { AdminLienheComponent } from './admin/main-admin/admin-lienhe/admin-lienhe.component';
import { AdminTonkhoChitietComponent } from './admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho-chitiet/admin-tonkho-chitiet.component';
import { AdminTonkhoComponent } from './admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho.component';
import { DanhmucChitietComponent } from './admin/main-admin/danhmuc/danhmuc-chitiet/danhmuc-chitiet.component';
import { DanhmucComponent } from './admin/main-admin/danhmuc/danhmuc.component';
import { DashboardComponent } from './admin/main-admin/dashboard/dashboard.component';
import { DonhangAdminChitietComponent } from './admin/main-admin/donhang-admin/donhang-admin-chitiet/donhang-admin-chitiet.component';
import { DonhangAdminComponent } from './admin/main-admin/donhang-admin/donhang-admin.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ProfileComponent } from './admin/main-admin/profile/profile.component';
import { MenuAdminChitietComponent } from './admin/menu/menu-admin/menu-admin-chitiet/menu-admin-chitiet.component';
import { MenuAdminComponent } from './admin/menu/menu-admin/menu-admin.component';
import { AdminuserDetailComponent } from './admin/users/adminuser/adminuser-detail/adminuser-detail.component';
import { AdminuserComponent } from './admin/users/adminuser/adminuser.component';
import { AuthGuard } from './admin/users/auth/guards/auth.guard';
import { GuestGuard } from './admin/users/auth/guards/guest.guard';
import { DangkyComponent } from './admin/users/dangky/dangky.component';
import { DangnhapComponent } from './admin/users/dangnhap/dangnhap.component';
import { BaivietAdminComponent } from './baiviet/baivietadmin/baivietadmin.component';
import { BaivietadminChitietComponent } from './baiviet/baivietadmin/baivietadminchitiet/baivietadminchitiet.component';
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
export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
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
                loadComponent: () => import('./site/sanpham/list-sanpham/list-sanpham.component').then(comp => comp.ListSanphamComponent)
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
                path: 'dangnhap',
                canActivate: [GuestGuard],
                component: DangnhapComponent,
            },
            {
                path: 'dangky',
                canActivate: [GuestGuard],
                component: DangkyComponent,
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                component: ProfileComponent,
            },
        ]
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: MainAdminComponent,
        children: [
            {
                path: 'menu',
                component: MenuAdminComponent,
                children: [
                    {
                        path: ':id',
                        component: MenuAdminChitietComponent,
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
                path: 'donhang',
                component: DonhangAdminComponent,
                children: [
                    {
                        path: ':id',
                        component: DonhangAdminChitietComponent,
                    },
                ]
            },
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
            {
                path: 'khachhang',
                component: AdminKhachhangComponent,
                children: [
                    {
                        path: ':id',
                        component: DonhangAdminChitietComponent,
                    },
                ]
            },
            {
                path: 'sanpham',
                component: SanphamAdminComponent,
                children: [
                    {
                        path: ':id',
                        component: SanphamAdminDetailComponent,
                    },
                ]
            },
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
                path: 'baiviet',
                component: BaivietAdminComponent,
                children: [
                    {
                        path: ':id',
                        component: BaivietadminChitietComponent,
                    }
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
                // children:[
                //     {
                //         path: ':id',
                //         component: AdminLienheChitietComponent,
                //     }
                // ]
            },
            {
                path: 'user',
                component: AdminuserComponent,
                children: [
                    {
                        path: ':id',
                        component: AdminuserDetailComponent
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
                path: 'tonkho',
                component: AdminTonkhoComponent,
                children: [
                    { path: ':id', component: AdminTonkhoChitietComponent }
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
];
