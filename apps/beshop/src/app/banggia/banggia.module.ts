import { Module } from '@nestjs/common';
  import { BanggiaService } from './banggia.service';
  import { BanggiaController } from './banggia.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { BanggiaEntity } from './entities/banggia.entity';
  @Module({
    imports: [TypeOrmModule.forFeature([BanggiaEntity])],
    controllers: [BanggiaController],
    providers: [BanggiaService],
    exports:[BanggiaService]
  })
  export class BanggiaModule {}