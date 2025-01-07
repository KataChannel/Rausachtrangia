import { Module } from '@nestjs/common';
import { BaivietService } from './baiviet.service';
import { BaivietController } from './baiviet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaivietEntity } from './entities/baiviet.entity';
import { DanhmucModule } from '../danhmuc/danhmuc.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([BaivietEntity]),
    DanhmucModule],
  controllers: [BaivietController],
  providers: [BaivietService]
})
export class BaivietModule { }
