import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medicine } from "./medicine.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class MedicineService {
    constructor(@InjectRepository(Medicine) private readonly medicine: Repository<Medicine>) {
    }
    async all() {
        try {
            return this.medicine.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async count() {
        try {
            return await this.medicine.count();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = '') {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.medicine.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    name: Like(`%${search}%`)
                }
            });

            return {
                data,
                total,
                page,
                limit,
            };
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async create(medicine: Medicine) {
        try {
            return await this.medicine.insert(medicine);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async save(medicine: Medicine) {
        try {
            return await this.medicine.save(medicine);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, medicine: Medicine) {
        try {
            return await this.medicine.update({id: id} , medicine);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findBySlug(slug: string) {
        try {
            return await this.medicine.findOneBy({
                slug: slug
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findById(id: number) {
        try {
            return await this.medicine.findOneBy({
                id: id
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number) {
        try {
            return await this.medicine.delete({id: id})

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

}