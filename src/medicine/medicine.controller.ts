import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException, HttpStatus,
    Param,
    Post,
    Put,
    Query, Req, Res,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { Request, Response } from "express";

import { MedicineService } from "./medicine.service";
import { Medicine } from "./medicine.entity";
import { MedicineCreateDto } from "./dto/medicine-create.dto";
import { MedicineUpdateDto } from "./dto/medicine-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { configMuler } from "../common/config/config-muler";
import { join } from "path";
import * as fs from "fs";
import { FileService } from "../common/file/file.service";
import { CreateSlugInterceptorFactory } from "../common/interceptor/create-slug/create-slug.interceptor";
import { AuthGuard } from "../common/guards/auth/auth.guard";
import { Roles } from "../common/decorators/roles/roles.decorator";
import { Role } from "../common/enums/role.enum";
import generateSlug from "../common/functions/GenerateSlug";

@Controller('medicine')
@UseGuards(AuthGuard)
export class MedicineController {
    constructor(private readonly medicineService: MedicineService, private readonly fileService: FileService) {
    }

    @Roles([Role.Admin])
    @Get("")
    async pagination(@Query() params: any, @Res() response: Response) {
        try {
            const data = await this.medicineService.paginated(params?.page, params?.limit, params?.search);
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
            const data = await this.medicineService.findById(id);
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
            const count = await this.medicineService.count();
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
    async findBySlug(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.medicineService.findBySlug(slug);
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
    @UseInterceptors(FileInterceptor('image', configMuler('medicine')))
    async add(@UploadedFile() image: Express.Multer.File,@Body() createMedicineDto: MedicineCreateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            if(image) {
                createMedicineDto.image = `${host}/uploads/medicine/${image.filename}`
            }
            createMedicineDto.slug = generateSlug(createMedicineDto.name)
            const create = await this.medicineService.save(createMedicineDto);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Create successfully",
                create
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles([Role.Admin])
    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('image', configMuler('medicine')))
    async update(@UploadedFile() image: Express.Multer.File, @Param('id') id: number, @Body() medicineUpdateDto: MedicineUpdateDto, @Res() response: Response, @Req() req: Request) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            const beforeUpdate = await this.medicineService.findById(id)

            if(image) {
                medicineUpdateDto.image = `${host}/uploads/medicine/${image.filename}`
                await this.fileService.delete(null, beforeUpdate.image.replace(`${host}/`, ""))
            }
            medicineUpdateDto.slug = generateSlug(medicineUpdateDto.name)
            const update = this.medicineService.update(id, medicineUpdateDto);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'File uploaded successfully!',
                update
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
            const medicine = await this.medicineService.findById(id)
            if(medicine) {
                const deleted = await this.fileService.delete(null, medicine.image.replace(`${host}/`, ""))
            }
            await this.medicineService.delete(id);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Delete successfully!',
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Post('/upload-file')
    @UseInterceptors(FileInterceptor('file', configMuler('medicine')))
    async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
        try {
            const host = `${req.protocol}://${req.get('host')}`;
            return response.status(HttpStatus.OK).json({
                message: 'File uploaded successfully!',
                file: file,
                url: `${host}/uploads/medicine/${file.filename}`
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles([Role.Admin])
    @Delete('/delete-image/:filename')
    async deleteFile(@Param('filename') filename: string, @Res() response: Response) {
        try {
            await this.fileService.delete('medicine', filename)
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'File deleted successfully!'
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
