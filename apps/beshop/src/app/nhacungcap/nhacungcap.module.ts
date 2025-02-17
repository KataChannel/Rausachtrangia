import { Module } from '@nestjs/common';
  import { NhacungcapService } from './nhacungcap.service';
  import { NhacungcapController } from './nhacungcap.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { NhacungcapEntity } from './entities/nhacungcap.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([NhacungcapEntity])],
    controllers: [NhacungcapController],
    providers: [NhacungcapService],
    exports:[NhacungcapService]
  })
  export class NhacungcapModule {}