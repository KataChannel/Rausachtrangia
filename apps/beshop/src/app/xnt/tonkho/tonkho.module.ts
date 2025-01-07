import { Module } from '@nestjs/common';
import { TonkhoService } from './tonkho.service';
import { TonkhoController } from './tonkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TonkhoEntity } from './entities/tonkho.entity';
import { DanhmucModule } from '../../danhmuc/danhmuc.module';
@Module({
  imports: [TypeOrmModule.forFeature([TonkhoEntity]),DanhmucModule],
  controllers: [TonkhoController],
  providers: [TonkhoService]
})
export class TonkhoModule {}
