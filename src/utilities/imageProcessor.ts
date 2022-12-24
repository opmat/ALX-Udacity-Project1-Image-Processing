import sharp from 'sharp';
import logger from './../utilities/logger';

const resizeImage = async (
  srcImage: string,
  destImage: string,
  sizeOptions: { height?: number; width?: number }
): Promise<boolean> => {
  let retValue = false;

  await sharp(srcImage)
    .resize({ height: sizeOptions.height, width: sizeOptions.width })
    .toFile(destImage)
    .then((data) => {
      // generated
      logger.info(`resizeImage module completed with ${JSON.stringify(data)}`);
      retValue = true;
      return retValue;
    })
    .catch((err) => {
      logger.error(`resizeImage module failed with ${JSON.stringify(err)}`);
      retValue = false;
      return retValue;
    });
  return retValue;
};

const convertImageFormat = async (
  srcImage: string,
  destImage: string,
  newFormat: sharp.AvailableFormatInfo
): Promise<boolean> => {
  let retValue = false;

  await sharp(srcImage)
    .toFormat(newFormat)
    .toFile(destImage)
    .then((data) => {
      // generated
      logger.info(`convertImage module completed with ${JSON.stringify(data)}`);
      retValue = true;
      return retValue;
    })
    .catch((err) => {
      logger.error(`convertImage module completed with ${JSON.stringify(err)}`);
      retValue = false;
      return retValue;
    });
  return retValue;
};

export default {
  resizeImage,
  convertImageFormat
};
