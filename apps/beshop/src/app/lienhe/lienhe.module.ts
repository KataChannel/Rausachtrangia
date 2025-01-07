import { Module } from '@nestjs/common';
import { LienheService } from './lienhe.service';
import { LienheController } from './lienhe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LienheEntity } from './entities/lienhe.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LienheEntity])],
  controllers: [LienheController],
  providers: [LienheService]
})
export class LienheModule {}
