import {
    Body,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    Query, Req,
    Res, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { FileService } from "../common/file/file.service";
import { Request, Response } from "express";
import { CreateSlugInterceptorFactory } from "../common/interceptor/create-slug/create-slug.interceptor";
import { TypeService } from "./type.service";
import { TypeUpdateDto } from "./dto/type-update.dto";
import { TypeCreateDto } from "./dto/type-create.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { configMuler } from "../common/config/config-muler";
import generateSlug from "../common/functions/GenerateSlug";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles/roles.decorator";

@Controller('type')
@UseGuards(AuthGuard)
export class TypeController {
    constructor(private readonly typeService: TypeService, private readonly fileService: FileService) {
    }

    @Roles([Role.Admin])
    @Get("")
    async pagination(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.typeService.paginated(params?.page, params?.limit, params?.search);
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
            const data = await this.typeService.findById(id);
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
    @Get('/test')
    async test(@Res() response: Response) {
        try {
            const data = await this.typeService.test();
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
    @Get(":slug")
    async findBySlug(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.typeService.findBySlug(slug);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully slug",
                data: data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Post('/create')
    @UseInterceptors(FileInterceptor("image", configMuler("type")))
    async add(@Body() type: TypeCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            type.slug = generateSlug(type.name)
            const create = await this.typeService.create(type);
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
    @Put('/update/:id')
    @UseInterceptors(FileInterceptor("image", configMuler("post")))
    async update(@Param('id') id: number, @Body() type: TypeUpdateDto, @Res() response: Response) {
        try {
            type.slug = generateSlug(type.name)
            const data = await this.typeService.update(id, type);
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
            const data = await this.typeService.delete(id);
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
