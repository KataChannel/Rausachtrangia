import { Module } from '@nestjs/common';
  import { PhieugiaodichService } from './phieugiaodich.service';
  import { PhieugiaodichController } from './phieugiaodich.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { PhieugiaodichEntity } from './entities/phieugiaodich.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([PhieugiaodichEntity])],
    controllers: [PhieugiaodichController],
    providers: [PhieugiaodichService],
    exports:[PhieugiaodichService]
  })
  export class PhieugiaodichModule {}