import { Injectable } from '@nestjs/common';
import { join } from "path";
import * as fs from "fs";

@Injectable()
export class FileService {
    async delete(folder: string = null, filename: string) {
        if(!filename) {
            return true;
        }
        const filePath = join(__dirname, '../../..', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        // else {
        //     console.log("NO FILE")
        //     return false;
        // }
    }

    async upload() {}

}
