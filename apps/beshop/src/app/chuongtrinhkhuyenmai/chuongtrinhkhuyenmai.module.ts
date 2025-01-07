import { Module } from '@nestjs/common';
import { ChuongtrinhkhuyenmaiService } from './chuongtrinhkhuyenmai.service';
import { ChuongtrinhkhuyenmaiController } from './chuongtrinhkhuyenmai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChuongtrinhkhuyenmaiEntity } from './entities/chuongtrinhkhuyenmai.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ChuongtrinhkhuyenmaiEntity])],
  controllers: [ChuongtrinhkhuyenmaiController],
  providers: [ChuongtrinhkhuyenmaiService],
  exports: [ChuongtrinhkhuyenmaiService]
})
export class ChuongtrinhkhuyenmaiModule {}
