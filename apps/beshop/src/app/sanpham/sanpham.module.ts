import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanphamEntity } from './entities/sanpham.entity';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import { DanhmucModule } from '../danhmuc/danhmuc.module';
@Module({
  imports: [TypeOrmModule.forFeature([SanphamEntity]),DanhmucModule],
  controllers: [SanphamController],
  providers: [SanphamService]
})
export class SanphamModule {}
