import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { JwtStrategy } from './entities/jwt.strategy';
import { LocalStrategy } from './entities/local.strategy';
import { UsergroupModule } from '../usergroup/usergroup.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity,RoleEntity,PermissionEntity]),
    UsergroupModule,
    PassportModule,
    JwtModule.register({
      secret: 'rausachtrangia',
      signOptions: { expiresIn: '30days' },
    }),
],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,LocalStrategy]
})
export class UsersModule {}
