import { Module } from '@nestjs/common';
import { GiohangService } from './giohang.service';
import { GiohangController } from './giohang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiohangEntity } from './entities/giohang.entity';
@Module({
  imports: [TypeOrmModule.forFeature([GiohangEntity])],
  controllers: [GiohangController],
  providers: [GiohangService],
  exports: [GiohangService]
})
export class GiohangModule {}
