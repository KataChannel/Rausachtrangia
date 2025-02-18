import { Module } from '@nestjs/common';
import { DonnccService } from './donncc.service';
import { DonnccController } from './donncc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonnccEntity } from './entities/donncc.entity';
import { DonnccitemEntity } from './entities/donnccitem.entity';
import { DonnccitemService } from './entities/donnccitem.service';
  @Module({
    imports: [TypeOrmModule.forFeature([DonnccEntity,DonnccitemEntity])],
    controllers: [DonnccController],
    providers: [DonnccService,DonnccitemService],
    exports:[DonnccService,DonnccitemService]
  })
  export class DonnccModule {}