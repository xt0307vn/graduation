import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Disease } from "./disease.entity";

@Injectable()
export class DiseaseService {

    constructor(@InjectRepository(Disease) private readonly disease: Repository<Disease>) {
    }

    async all() {
        try {
            return await this.disease.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async count() {
        try {
            return await this.disease.count();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async all11() {
        try {
            return await this.disease.find({
                relations: {
                    types: true
                }
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async queryBuilder() {
        try {
            return await this.disease.createQueryBuilder('disease');
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = '') {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.disease.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                where: [
                    {
                        name: Like(`%${search}%`)
                    },
                    {
                        symptoms: Like(`%${search}%`)
                    }
                ],
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

    async create(disease: Disease) {
        try {
            return await this.disease.insert(disease);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async save(disease: Disease) {
        try {
            return await this.disease.save(disease);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, disease: Disease) {
        try {
            return await this.disease.update({id: id} , disease);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findBySlug(slug: string) {
        try {
            return await this.disease.findOne({
                where: {
                    slug: slug
                },
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findById(id: number) {
        try {
            return await this.disease.findOne({
                where: {
                    id: id,
                },
                relations: ['types']
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number) {
        try {
            return await this.disease.delete({id: id})

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findByType(id: number, limit: number = 12) {
        try {
            return await this.disease.createQueryBuilder('disease')
                .leftJoinAndSelect('disease.types', 'type')
                .select(['disease.id', 'disease.name', 'disease.image', "disease.slug"])
                .where('type.id = :idType', {idType: id})
                .printSql()
                .limit(limit)
                .getMany()
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
