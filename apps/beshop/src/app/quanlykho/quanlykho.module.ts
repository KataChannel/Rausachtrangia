import { Module } from '@nestjs/common';
  import { QuanlykhoService } from './quanlykho.service';
  import { QuanlykhoController } from './quanlykho.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { QuanlykhoEntity } from './entities/quanlykho.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([QuanlykhoEntity])],
    controllers: [QuanlykhoController],
    providers: [QuanlykhoService],
    exports:[QuanlykhoService]
  })
  export class QuanlykhoModule {}