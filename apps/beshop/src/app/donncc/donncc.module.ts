import { Module } from '@nestjs/common';
import { DonnccService } from './donncc.service';
import { DonnccController } from './donncc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonnccEntity } from './entities/donncc.entity';
import { NhacungcapModule } from '../nhacungcap/nhacungcap.module';
  @Module({
    imports: [
      TypeOrmModule.forFeature([DonnccEntity]),
      NhacungcapModule
  ],
    controllers: [DonnccController],
    providers: [DonnccService],
    exports:[DonnccService]
  })
  export class DonnccModule {}