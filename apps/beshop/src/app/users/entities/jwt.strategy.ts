import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'rausachtrangia') {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "rausachtrangia"
        });
    }
    async validate(payload: any) {
        return payload;
        
      }
    // async validate(user:User): Promise<any> {
    //     const data = await this.authService.validateUser(user);
    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }
    //     return data;
    //   }
}
@Injectable()
export class JwtCustomStrategy extends PassportStrategy(Strategy,'rausachtrangia') {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "rausachtrangia"
        });
    }
    async validate(payload: any) {
        // console.error(payload);
        return payload;        
      }
    // async validate(user:User): Promise<any> {
    //     const data = await this.authService.validateUser(user);
    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }
    //     return data;
    //   }
}
