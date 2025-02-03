import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Not, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private user: Repository<User>,
        private readonly jwtService: JwtService) {
    }

    async all() {
        try {
            return this.user.find();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async count() {
        try {
            return await this.user.count();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async paginated(page: number = 1, limit: number = 10, search: string = '') {
        try {

            limit = limit > 100 ? 100 : limit;

            const [data, total] = await this.user.findAndCount({
                select: ['name', 'status', 'phone_number', 'email', 'id'],
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    name: Like(`%${search}%`),
                    role_id: Not(1)
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

    async create(user: User) {
        try {
            user.password = await bcrypt.hash(user.password, 5);
            return await this.user.insert(user);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, user: User) {
        try {
            return await this.user.update({id: id} , user);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findByName(name: string) {
        try {
            return await this.user.findOneBy({
                name: name
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    async findByPhoneNumber(phone_number: string) {
        try {
            return await this.user.findOne({
                where: {
                    phone_number: phone_number
                }
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async findById(id: number) {
        try {
            return await this.user.findOneBy({
                id: id
            })
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number) {
        try {
            return await this.user.delete({id: id})

        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
