import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonhangEntity } from './entities/donhang.entity';
import { GiohangModule } from '../giohang/giohang.module';
import { KhachhangModule } from '../khachhang/khachhang.module';
import { SanphamModule } from '../sanpham/sanpham.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([DonhangEntity]),
    GiohangModule,
    KhachhangModule,
    SanphamModule
  ],
  controllers: [DonhangController],
  providers: [DonhangService]
})
export class DonhangModule {}
