import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put, Query, Req,
    Res, UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryCreateDto } from "./dto/category-create.dto";
import slugify from "slugify";
import {
    CreateSlugInterceptor,
    CreateSlugInterceptorFactory
} from "../common/interceptor/create-slug/create-slug.interceptor";
import { Request, Response } from "express";
import { ParseToArrayInterceptorFactory } from "../common/interceptor/parse-to-array/parse-to-array.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { configMuler } from "../common/config/config-muler";
import { DiseaseCreateDto } from "../disease/dto/disease-create.dto";
import { Type } from "../type/type.entity";
import { FileService } from "../common/file/file.service";
import generateSlug from "../common/functions/GenerateSlug";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles/roles.decorator";

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService, private readonly fileService: FileService) {
    }


    @Roles([Role.Admin])
    @Get("")
    async pagination(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.categoryService.paginated(params?.page, params?.limit, params?.search);
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
            const data = await this.categoryService.findById(id);
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
    @Get(":slug")
    async findBySlug(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.categoryService.findBySlug(slug);
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
    @UseInterceptors(FileInterceptor('image', configMuler('category')))
    async add(@Body() categoryDto: CategoryCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            categoryDto.slug = generateSlug(categoryDto.name)
            const create = await this.categoryService.save(categoryDto);
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
    @Put('/save')
    @UseInterceptors(FileInterceptor('image', configMuler('category')))
    async save(@Body() category: CategoryCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            category.slug = generateSlug(category.name)
            const create = await this.categoryService.save(category);
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
    @UseInterceptors(FileInterceptor('image', configMuler('category')))
    async update(@Body() categoryDto: CategoryCreateDto, @Res() response: Response, @Req() req: Request, @Param('id') id: number) {
        try {
            const category = await this.categoryService.findById(id)
            categoryDto.slug = generateSlug(categoryDto.name)
            Object.assign(category, categoryDto);
            const create = await this.categoryService.save(category);
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
    @Delete('/delete/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            await this.categoryService.delete(id);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete",
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Post('/upload-file')
    @UseInterceptors(FileInterceptor('file', configMuler('category')))
    async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            return response.status(HttpStatus.OK).json({
                message: 'File uploaded successfully!',
                file: file,
                url: `${host}/uploads/category/${file.filename}`
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Delete('/delete-image/:filename')
    async deleteFile(@Param('filename') filename: string, @Res() response: Response) {
        try {
            const data = await this.fileService.delete('category', filename)
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete file",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
