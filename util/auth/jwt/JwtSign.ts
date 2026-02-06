import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from 'src/feature/user/domain/AuthenticatedUser';
export class JwtSign {
    constructor(private jwtService: JwtService, private jwtPayload: any) { }

    execute() {
        const access_token = this.jwtService.sign(this.jwtPayload)

        if (access_token) {
            const user = AuthenticatedUser.getInstance()
            user.phone = this.jwtPayload.phone
            user.userId = this.jwtPayload.userId
            user.name = this.jwtPayload.name
            user.role = this.jwtPayload.role
        }

        return access_token
    }
}