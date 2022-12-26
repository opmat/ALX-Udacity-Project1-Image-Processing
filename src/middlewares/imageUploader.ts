import multer from 'multer';
import path from 'path';
import imagePreProcessor from '../utilities/imagePreProcessor';
import logger from '../utilities/logger';

/**
 * Image upload Parts
 *
 */
const imageStorage: multer.StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './images/original');
  },
  filename: (_req, file, cb) => {
    const ext: string = path.extname(file.originalname).substring(1);
    let newFileName: string = path.parse(file.originalname).name;
    newFileName = newFileName.replace(' ', '-') + `.${ext}`;
    cb(null, newFileName);
  }
});

const imageUploader: multer.Multer = multer({
  storage: imageStorage,
  fileFilter: (_req, file, cb) => {
    const ext: string = path.extname(file.originalname).substring(1);
    if (!imagePreProcessor.isValidInputImageFormat(ext)) {
      // if file type is not a valid image format, return error
      logger.error(`imageUploader module completed with invalid format error`);
      return cb(new Error('Invalid image file uploaded'));
    }
    cb(null, true);
  }
});

const uploadSingleImage = imageUploader.single('image');

export default {
  imageUploader,
  uploadSingleImage
};
