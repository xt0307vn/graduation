import {
    Body,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    Query, Req,
    Res,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { FileService } from "../common/file/file.service";
import { Request, Response } from "express";
import { CreateSlugInterceptorFactory } from "../common/interceptor/create-slug/create-slug.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { configMuler } from "../common/config/config-muler";
import { DiseaseService } from "./disease.service";
import { DiseaseCreateDto } from "./dto/disease-create.dto";
import { DiseaseUpdateDto } from "./dto/disease-update.dto";
import { TextToArrayInterceptor } from "../common/interceptor/text-to-array/text-to-array.interceptor";
import { Type } from "../type/type.entity";
import { ParseToArrayInterceptorFactory } from "../common/interceptor/parse-to-array/parse-to-array.interceptor";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Roles } from "../common/decorators/roles/roles.decorator";
import { Role } from "../common/enums/role.enum";
import generateSlug from "../common/functions/GenerateSlug";

@Controller('disease')
@UseGuards(AuthGuard)
export class DiseaseController {
    constructor(private readonly diseaseService: DiseaseService, private readonly fileService: FileService) {
    }

    @Roles([Role.Admin])
    @Get("")
    async pagination(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.diseaseService.paginated(params?.page, params?.limit, params?.search);
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
    @Get("relations")
    async relations(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.diseaseService.all11();
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
    @Get("type")
    async findByType(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.diseaseService.findByType(params?.id, params?.limit);
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
            const count = await this.diseaseService.count();
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
    @Get(":id(\\d+)")
    async findById(@Param("id") id: number, @Res() response: Response) {
        try {
            const data = await this.diseaseService.findById(id);
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
            const data = await this.diseaseService.findBySlug(slug);
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
    @UseInterceptors(ParseToArrayInterceptorFactory('types'))
    @UseInterceptors(FileInterceptor('image', configMuler('disease')))
    async add(@UploadedFile() image: Express.Multer.File, @Body() disease: DiseaseCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            if(image) {
                disease.image = `${host}/uploads/disease/${image.filename}`;
            }
            if(disease.types.length != 0) {
                disease.types = disease.types.map(type => ({ ...new Type(), id: parseInt(type.toString()) }))
            }
            disease.slug = generateSlug(disease.name)
            const create = await this.diseaseService.save(disease);
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
    @UseInterceptors(ParseToArrayInterceptorFactory('types'))
    @UseInterceptors(FileInterceptor('image', configMuler('disease')))
    async save(@UploadedFile() image: Express.Multer.File, @Body() disease: DiseaseCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            if(image) {
                disease.image = `${host}/uploads/disease/${image.filename}`;
            }
            if(disease.types.length != 0) {
                disease.types = disease.types.map(type => ({ ...new Type(), id: parseInt(type.toString()) }))
            }
            disease.slug = generateSlug(disease.name)
            const create = await this.diseaseService.save(disease);
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
    @UseInterceptors(ParseToArrayInterceptorFactory('types'))
    @UseInterceptors(FileInterceptor('image', configMuler('disease')))
    async update(@UploadedFile() image: Express.Multer.File, @Body() diseaseUpdate: DiseaseCreateDto, @Res() response: Response, @Req() req: Request, @Param('id') id: number) {
        try {
            const disease = await this.diseaseService.findById(id)

            const host = `${req.protocol}://${req.get('host')}`;
            if(image) {
                diseaseUpdate.image = `${host}/uploads/disease/${image.filename}`;
                await this.fileService.delete(null, disease.image.replace(`${host}/`, ""))
            }
            if(diseaseUpdate.types.length != 0) {
                diseaseUpdate.types = diseaseUpdate.types.map(type => ({ ...new Type(), id: parseInt(type.toString()) }))
            } else {
                delete diseaseUpdate.types;
                delete disease.types;
            }
            diseaseUpdate.slug = generateSlug(diseaseUpdate.name)
            Object.assign(disease, diseaseUpdate);
            const create = await this.diseaseService.save(disease);
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
    async delete(@Param('id') id: number, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get("host")}`;
            const disease = await this.diseaseService.findById(id)
            if(disease) {
                const deleted = await this.fileService.delete(null, disease.image.replace(`${host}/`, ""))
            }
            await this.diseaseService.delete(id);
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
    @UseInterceptors(FileInterceptor('file', configMuler('disease')))
    async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
        try {
            console.log("file", file);
            const host = `${req.protocol}://${req.get('host')}`;
            return response.status(HttpStatus.OK).json({
                message: 'File uploaded successfully!',
                file: file,
                url: `${host}/uploads/disease/${file.filename}`
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Delete('/delete-image/:filename')
    async deleteFile(@Param('filename') filename: string, @Res() response: Response) {
        try {
            const data = await this.fileService.delete('disease', filename)
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
