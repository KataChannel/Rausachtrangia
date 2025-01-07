import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonhangEntity } from './entities/donhang.entity';
import { GiohangModule } from '../giohang/giohang.module';
import { KhachhangModule } from '../khachhang/khachhang.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([DonhangEntity]),
    GiohangModule,
    KhachhangModule
  ],
  controllers: [DonhangController],
  providers: [DonhangService]
})
export class DonhangModule {}
