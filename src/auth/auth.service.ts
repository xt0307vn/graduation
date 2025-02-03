import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "./dto/user-login.dto";

type AuthInput = { phone_number: string, password: string }
type SignInData = { userId: number, phone_number: string }
type AuthResult = { accessToken: string, userId: number, phone_number: string }

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
    }

    async login(user: User) {
        try {
            const data = await this.userService.findByPhoneNumber(user.phone_number);
            const {password, ...rest} = data;
            const token = this.generateToken(data)
            return {
                data: rest,
                ...token
            }
        } catch (e) {

        }
    }

    private generateToken({phone_number}) {
        const accessToken = this.jwtService.sign({
            phone_number
        });
        return {
            expiresIn: 2592000,
            accessToken
        }
    }

    async authenticate(userLoginDto: UserLoginDto) {
        const user = await this.validateUser(userLoginDto)

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user)
    }

    async validateUser(userLoginDto: UserLoginDto) {
        const user = await this.userService.findByPhoneNumber(userLoginDto.phone_number)
        if (user && bcrypt.compare(userLoginDto.password, user.password)) {
            return user
        }
        return null
    }

    async signIn(user: UserLoginDto) {
        const {password, ...tokenPayload} = user

        const access_token = await this.jwtService.signAsync(tokenPayload)

        return {
            access_token,
            ...tokenPayload
        }
    }

    async register(user: User) {
        try {
            return await this.userService.create(user);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
