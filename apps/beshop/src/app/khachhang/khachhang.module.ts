import { Module } from '@nestjs/common';
import { KhachhangService } from './khachhang.service';
import { KhachhangController } from './khachhang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhachhangEntity } from './entities/khachhang.entity';
@Module({
  imports: [TypeOrmModule.forFeature([KhachhangEntity])],
  controllers: [KhachhangController],
  providers: [KhachhangService],
  exports: [KhachhangService]
})
export class KhachhangModule {}
