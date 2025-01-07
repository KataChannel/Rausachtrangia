import { Module } from '@nestjs/common';
import { NhapkhoService } from './nhapkho.service';
import { NhapkhoController } from './nhapkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhapkhoEntity } from './entities/nhapkho.entity';
import { DanhmucModule } from '../../danhmuc/danhmuc.module';
@Module({
  imports: [TypeOrmModule.forFeature([NhapkhoEntity]),DanhmucModule],
  controllers: [NhapkhoController],
  providers: [NhapkhoService]
})
export class NhapkhoModule {}
