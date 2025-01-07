import { Module } from '@nestjs/common';
import { DanhmucbaivietService } from './danhmucbaiviet.service';
import { DanhmucbaivietController } from './danhmucbaiviet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhmucbaivietEntity } from './entities/danhmucbaiviet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DanhmucbaivietEntity])],
  controllers: [DanhmucbaivietController],
  providers: [DanhmucbaivietService]
})
export class DanhmucbaivietModule {}

