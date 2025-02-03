import { diskStorage } from 'multer';
import { extname } from 'path';

export const configMuler = (path: string = null) => {
    return {
        storage: diskStorage({
            destination: path ? `./uploads/${path}` : './uploads/', // Thư mục lưu trữ file
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname); // Lấy phần mở rộng của file
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|avif)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    };
}
