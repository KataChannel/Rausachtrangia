import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailController } from './email.controller';
import { ConfigEmailEntity } from './entities/email.entity';
@Module({
  imports:[TypeOrmModule.forFeature([ConfigEmailEntity])],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
