import { Disease } from "../../disease/disease.entity";
import { IsNotEmpty } from "class-validator";

export class TypeUpdateDto {
    id: number

    @IsNotEmpty({message: "Tên không được để trống"})
    name: string
    
    slug: string

    diseases?: Disease[]
}