import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly category: Repository<Category>) {
    }

    async all() {
        try {
            return this.category.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = '') {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.category.findAndCount({
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

    async create(category: Category) {
        try {
            return await this.category.insert(category);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async save(category: Category) {
        try {
            return await this.category.save(category);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, category: Category) {
        try {
            return await this.category.update({id: id} , category);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findBySlug(slug: string) {
        try {
            return await this.category.findOneBy({
                slug: slug
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findById(id: number) {
        try {
            return await this.category.findOneBy({
                id: id
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number) {
        try {
            return await this.category.delete({id: id})

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
