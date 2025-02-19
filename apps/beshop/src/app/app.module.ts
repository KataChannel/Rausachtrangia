import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaivietModule } from './baiviet/baiviet.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { GiohangModule } from './giohang/giohang.module';
import { DonhangModule } from './donhang/donhang.module';
import { KhachhangModule } from './khachhang/khachhang.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { LienheModule } from './lienhe/lienhe.module';
import { ChuongtrinhkhuyenmaiModule } from './chuongtrinhkhuyenmai/chuongtrinhkhuyenmai.module';
import { NhapkhoModule } from './xnt/nhapkho/nhapkho.module';
import { TonkhoModule } from './xnt/tonkho/tonkho.module';
import { EmailModule } from './email/email.module';
import { MenuModule } from './menu/menu.module';
import { CauhinhModule } from './cauhinh/cauhinh.module';
import { DanhmucbaivietModule } from './danhmucbaiviet/danhmucbaiviet.module';
import { SlideModule } from './slide/slide.module';
import { VisitorModule } from './visitor/visitor.module';
import { BanggiaModule } from './banggia/banggia.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NhacungcapModule } from './nhacungcap/nhacungcap.module';
import { PhieugiaodichModule } from './phieugiaodich/phieugiaodich.module';
import { PhieukhoModule } from './phieukho/phieukho.module';
import { DonnccModule } from './donncc/donncc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '45.252.248.64',
      port: 3306,
      username: 'zbhykhog_rausachv2',
      password: '@Rausachv2',
      database: 'zbhykhog_sanbox',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      charset: "utf8mb4",
    }), 
     DanhmucModule,
     SanphamModule,
     BaivietModule,
     GiohangModule,
     DonhangModule,
     KhachhangModule,
     UsersModule,
     UploadModule,
     LienheModule,
     ChuongtrinhkhuyenmaiModule,
     NhapkhoModule,
     TonkhoModule,
     EmailModule,
     MenuModule,
     CauhinhModule,
     DanhmucbaivietModule,
     SlideModule,
     VisitorModule,
     BanggiaModule,
     RoleModule,
     PermissionModule,
     NhacungcapModule,
     PhieugiaodichModule,
     PhieukhoModule,
     DonnccModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
