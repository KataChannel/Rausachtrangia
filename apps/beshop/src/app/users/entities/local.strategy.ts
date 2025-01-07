import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _UsersService: UsersService) {
    super();
  }
  async validate(user:any): Promise<any> {
    const data = await this._UsersService.validateUser(user);
    if (!data) {
      throw new UnauthorizedException();
    }
    return data;
  }
}
