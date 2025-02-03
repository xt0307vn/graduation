import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Post } from "./post.entity";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { Medicine } from "../medicine/medicine.entity";

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private readonly post: Repository<Post>) {
    }
    async all() {
        try {
            return this.post.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async count() {
        try {
            return await this.post.count();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = '') {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.post.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    title: Like(`%${search}%`)
                },
                relations: ['category']
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

    async create(post: Post) {
        try {
            return await this.post.insert(post);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, post: PostUpdateDto) {
        try {
            return await this.post.update({id: id} , post);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findBySlug(slug: string) {
        try {
            return await this.post.findOne({
                where: {
                    slug: slug
                },
                relations: ['category']
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findById(id: number) {
        try {
            return await this.post.findOne({
                where: {
                    id: id
                },
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async save(post: Post) {
        try {
            return await this.post.save(post);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number) {
        try {
            return await this.post.delete({id: id})

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
