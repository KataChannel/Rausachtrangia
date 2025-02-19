import { Module } from '@nestjs/common';
import { DonnccService } from './donncc.service';
import { DonnccController } from './donncc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonnccEntity } from './entities/donncc.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([DonnccEntity])],
    controllers: [DonnccController],
    providers: [DonnccService],
    exports:[DonnccService]
  })
  export class DonnccModule {}