import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/feature/user/domain/AuthenticatedUser';
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    validate(payload: any): any {
        console.log("==============",payload)
        const user = AuthenticatedUser.getInstance()
        user.userId = payload.userId
        user.name = payload.name
        user.role = payload.role
        return payload
    }
}
