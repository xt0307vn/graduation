import {
    Body,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    Query, Req,
    Res, UseGuards
} from "@nestjs/common";
import { FileService } from "../common/file/file.service";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles/roles.decorator";


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService, private readonly fileService: FileService) {
    }

    @Roles([Role.Admin])
    @Get("")
    async pagination(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.userService.paginated(params?.page, params?.limit, params?.search);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Get(":id(\\d+)")
    async findById(@Param("id") id: number, @Res() response: Response) {
        try {
            const data = await this.userService.findById(id);
            return response.status(HttpStatus.OK).json({    
                status: HttpStatus.OK,
                message: "Successfully",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Get("/count")
    async countAll(@Res() response: Response) {
        try {
            const count = await this.userService.count();
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                count
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Post('/create')
    async add(@Body() user: UserCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const create = await this.userService.create(user);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                create
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Post('/login')
    async login(@Body() user: UserLoginDto, @Res() response: Response, @Req() req: Request) {
        try {
            const data = await this.userService.findByPhoneNumber(user.phone_number);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() type: UserUpdateDto, @Res() response: Response) {
        try {
            const data = await this.userService.update(id, type);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Delete('/delete/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const data = await this.userService.delete(id);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
