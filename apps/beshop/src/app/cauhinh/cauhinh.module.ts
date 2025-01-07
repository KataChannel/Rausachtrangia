import { Module } from '@nestjs/common';
import { CauhinhService } from './cauhinh.service';
import { CauhinhController } from './cauhinh.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CauhinhEntity } from './entities/cauhinh.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CauhinhEntity])],
  controllers: [CauhinhController],
  providers: [CauhinhService]
})
export class CauhinhModule {}

