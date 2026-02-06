import { extname } from 'path';
import { existsSync, mkdir } from 'fs';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common';
import { diskStorage } from 'multer';

function randomName(file: any) {
  const fileName = `photo_${Date.now()}${extname(file.originalname)}`;
  return fileName;
}

export const MulterConfig = {
  storage: diskStorage({
    filters: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            'Unsupported file type ${extname(file.orginialname)})',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
    destination: (req: any, file: any, cb: any) => {
      let uploadPath: any;
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        uploadPath = 'uploads/images/';
      } else {
        uploadPath = 'uploads/files';
      }
      if (!existsSync(uploadPath)) {
        mkdir(uploadPath,()=>{});
      } else {
        cb(null, uploadPath);
      }
    },
    filename: (req: any, file: any, cb: any) => {
      const filename = randomName(file);
      cb(null, filename);
    },
  }),
};
