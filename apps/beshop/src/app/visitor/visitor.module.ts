import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorEntity } from './entities/visitor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([VisitorEntity])],
  controllers: [VisitorController],
  providers: [VisitorService]
})
export class VisitorModule {}



