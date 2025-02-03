import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MedicineService } from "../medicine/medicine.service";
import { DiseaseService } from "../disease/disease.service";
import { PostService } from "../post/post.service";

@Injectable()
export class PublicService {
    constructor(private readonly medicine: MedicineService, private readonly disease: DiseaseService, private readonly post: PostService) {
    }



    /**
     * medicine paginated
     * @param page
     * @param limit
     * @param search
     */
    async paginatedMedicine(page: number = 1, limit: number = 10, search: string = '') {
        try {
            return await this.medicine.paginated(page, limit, search)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * medicine slug
     * @param slug
     */
    async findBySlugMedicine(slug: string) {
        try {
            return await this.medicine.findBySlug(slug)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * disease paginated
     * @param page
     * @param limit
     * @param search
     */
    async paginatedDisease(page: number = 1, limit: number = 10, search: string = '') {
        try {
            return await this.disease.paginated(page, limit, search)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * disease slug
     * @param slug
     */
    async findBySlugDisease(slug: string) {
        try {
            return await this.disease.findBySlug(slug)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * disease type
     * @param id
     * @param limit
     */
    async findByTypeDisease(id: number, limit: number = 12) {
        try {
            return await this.disease.findByType(id, limit)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * post paginated
     * @param page
     * @param limit
     * @param search
     */
    async paginatedPost(page: number = 1, limit: number = 10, search: string = '') {
        try {
            return await this.post.paginated(page, limit, search)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * post slug
     * @param slug
     */
    async findBySlugPost(slug: string) {
        try {
            return await this.post.findBySlug(slug)
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
