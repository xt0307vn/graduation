import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards, Request, Res, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Response } from "express";
import { UserCreateDto } from "../user/dto/user-create.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/register')
    async add(@Body() user: UserCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const create = await this.authService.register(user);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                create
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login')
    async login(@Body() input: UserLoginDto, @Res() response: Response) {
        try {
            const data = await this.authService.authenticate(input)
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Successfully',
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getUserInfo(@Request() request, @Res() response: Response) {
        try {
            const data = request.user
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Successfully',
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
