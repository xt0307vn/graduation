import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Param,
    Post,
    Put,
    Query, Req,
    Res,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { Response, Request } from "express";
import { FileService } from "../common/file/file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { configMuler } from "../common/config/config-muler";
import { PostService } from "./post.service";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { CreateSlugInterceptorFactory } from "../common/interceptor/create-slug/create-slug.interceptor";
import { CategoryService } from "../category/category.service";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Roles } from "../common/decorators/roles/roles.decorator";
import { Role } from "../common/enums/role.enum";
import generateSlug from "../common/functions/GenerateSlug";

@Controller("post")
@UseGuards(AuthGuard)
export class PostController {
    constructor(private readonly postService: PostService, private readonly fileService: FileService) {
    }

    @Roles([Role.Admin])
    @Get("")
    async pagination(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.postService.paginated(params?.page, params?.limit, params?.search);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Get(":id(\\d+)")
    async findById(@Param("id") id: number, @Res() response: Response) {
        try {
            const data = await this.postService.findById(id);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Get("/count")
    async countAll(@Res() response: Response) {
        try {
            const count = await this.postService.count();
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
    @Get(":slug")
    async findBySlug(@Param("slug") slug: string, @Res() response: Response) {
        try {
            const data = await this.postService.findBySlug(slug);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully slug",
                data: data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }


    @Roles([Role.Admin])
    @Post("/create")
    @UseInterceptors(FileInterceptor("image", configMuler("post")))
    async add(@UploadedFile() image: Express.Multer.File, @Body() postCreateDto: PostCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get("host")}`;

            if (image) {
                postCreateDto.image = `${host}/uploads/post/${image.filename}`;
            }
            postCreateDto.slug = generateSlug(postCreateDto.title)
            const create = await this.postService.save(postCreateDto);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                create
            });
        } catch (e) {
            console.error('Error occurred:', e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Put("/update/:id")
    @UseInterceptors(FileInterceptor("image", configMuler("post")))
    async update(@UploadedFile() image: Express.Multer.File, @Param("id") id: number, @Body() postUpdateDto: PostUpdateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get("host")}`;
            const beforeUpdate = await this.postService.findById(id)

            if (image) {
                postUpdateDto.image = `${host}/uploads/post/${image.filename}`;
                await this.fileService.delete(null, beforeUpdate.image.replace(`${host}/`, ""))
            }
            postUpdateDto.slug = generateSlug(postUpdateDto.title)
            const data = await this.postService.update(id, postUpdateDto);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Delete("/delete/:id")
    async delete(@Param("id") id: number, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get("host")}`;
            const post = await this.postService.findById(id)
            await this.postService.delete(id);
            if(post) {
                const deleted = await this.fileService.delete(null, post.image.replace(`${host}/`, ""))
            }
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete",
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Post("/upload-file")
    @UseInterceptors(FileInterceptor("file", configMuler("post")))
    async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
        try {
            const host = `${req.protocol}://${req.get("host")}`;
            return response.status(HttpStatus.OK).json({
                message: "File uploaded successfully!",
                file: file,
                url: `${host}/uploads/post/${file.filename}`
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Delete("/delete-image/:filename")
    async deleteFile(@Param("filename") filename: string, @Res() response: Response) {
        try {
            const data = await this.fileService.delete("medicine", filename);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully delete file",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
