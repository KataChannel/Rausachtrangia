import { Module } from '@nestjs/common';
import { Demo3Service } from './demo3.service';
import { Demo3Controller } from './demo3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demo3Entity } from './entities/demo3.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Demo3Entity])],
  controllers: [Demo3Controller],
  providers: [Demo3Service],
  exports:[Demo3Service]
})
export class Demo3Module {}