import { UserRoles } from "util/API/UserRoles"


export class AuthenticatedUser {
    public phone:string
    public userId: string
    public name: string
    public role: UserRoles


    private static user = new AuthenticatedUser()

    static getInstance() {
        return this.user
    }
}