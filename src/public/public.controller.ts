import { Controller, Get, HttpException, HttpStatus, Param, Query, Res } from "@nestjs/common";
import { FileService } from "../common/file/file.service";
import { PublicService } from "./public.service";
import { Response } from "express";

@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService, private readonly fileService: FileService) {}

    @Get('medicine')
    async paginationMedicine(@Query() params: any, @Res() response: Response) {
        try {
            const data = await this.publicService.paginatedMedicine(params?.page, params?.limit, params?.search);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Get("medicine/:slug")
    async findBySlugMedicine(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.publicService.findBySlugMedicine(slug);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully slug",
                data: data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('disease')
    async paginationDisease(@Query() params: any, @Res() response: Response) {
        try {
            const data = await this.publicService.paginatedDisease(params?.page, params?.limit, params?.search);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Get("disease/type")
    async findByTypeDisease(@Res() response: Response, @Query() params: any) {
        try {
            const data = await this.publicService.findByTypeDisease(params?.id, params?.limit);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Get("disease/:slug")
    async findBySlugDisease(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.publicService.findBySlugDisease(slug);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully slug",
                data: data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('post')
    async paginationPost(@Query() params: any, @Res() response: Response) {
        try {
            const data = await this.publicService.paginatedPost(params?.page, params?.limit, params?.search);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully",
                data
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Get("post/:slug")
    async findBySlugPost(@Param("slug", ) slug: string, @Res() response: Response) {
        try {
            const data = await this.publicService.findBySlugPost(slug);
            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: "Successfully slug",
                data: data
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
