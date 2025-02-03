import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Type } from "./type.entity";
import { Disease } from "../disease/disease.entity";

@Injectable()
export class TypeService {

    constructor(@InjectRepository(Type) private readonly type: Repository<Type>) {
    }

    async all() {
        try {
            return this.type.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = "") {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.type.findAndCount({
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
                limit
            };
        } catch (e) {
            throw new HttpException("Error create", HttpStatus.BAD_REQUEST);
        }
    }

    async create(type: Type) {
        try {
            return await this.type.insert(type);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, type: Type) {
        try {
            return await this.type.update({ id: id }, type);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async findBySlug(slug: string) {
        try {
            return await this.type.findOneBy({
                slug: slug
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: number) {
        try {
            return await this.type.findOneBy({
                id: id
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {
        try {
            return await this.type.delete({ id: id });

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async test() {
        try {
            const types = await this.type
                .createQueryBuilder('type')
                // .where('type.id = 3' )
                .addSelect('SUM(type.id*3)', 'sum')
                .groupBy("type.id")
                .getRawMany();

            return types;

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
