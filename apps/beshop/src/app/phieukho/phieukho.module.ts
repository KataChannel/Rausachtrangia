import { Module } from '@nestjs/common';
  import { PhieukhoService } from './phieukho.service';
  import { PhieukhoController } from './phieukho.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { PhieukhoEntity } from './entities/phieukho.entity';
import { SanphamModule } from '../sanpham/sanpham.module';
  @Module({
    imports: [
      TypeOrmModule.forFeature([PhieukhoEntity]),
      SanphamModule
    ],
    controllers: [PhieukhoController],
    providers: [PhieukhoService],
    exports:[PhieukhoService]
  })
  export class PhieukhoModule {}