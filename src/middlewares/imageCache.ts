import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import imagePreProcessor from '../utilities/imagePreProcessor';
import imageProcessor from '../utilities/imageProcessor';

// Resize image based on provided parameters
const imageCache = async (req: Request, res: Response, next: NextFunction) => {
  const ext =
    typeof req.query.format !== 'undefined' && req.query.format
      ? '.' + req.query.format
      : '.jpg';
  const rawImageName = req.params.imageName + ext;
  const processedImageName = imagePreProcessor.imageNameFormatter(
    req.params.imageName,
    req.query
  );
  try {
    if (
      fs.existsSync(imagePreProcessor.processedFileDir + processedImageName)
    ) {
      //file exists
      res.locals.rawImageName = imagePreProcessor.rawFileDir + rawImageName;
      res.locals.processedImageName =
        imagePreProcessor.processedFileDir + processedImageName;
    } else {
      //file does not exist. check if full image exist
      // then generate the resized image
      if (fs.existsSync(imagePreProcessor.rawFileDir + rawImageName)) {
        res.locals.rawImageName = imagePreProcessor.rawFileDir + rawImageName;

        //if width and height is not define return the raw file
        if (
          (typeof req.query.height === 'undefined' ||
            req.query.height === null) &&
          (typeof req.query.width === 'undefined' || req.query.width === null)
        ) {
          res.locals.processedImageName = res.locals.rawImageName;
        } else {
          //generate resized image from raw image
          let success: Promise<boolean>;
          if (
            typeof req.query.height === 'undefined' ||
            req.query.height === null
          ) {
            // only width provided
            success = imageProcessor.resizeImage(
              imagePreProcessor.rawFileDir + rawImageName,
              imagePreProcessor.processedFileDir + processedImageName,
              { width: parseInt(req.query.width as unknown as string) }
            );
          } else if (
            typeof req.query.width === 'undefined' ||
            req.query.width === null
          ) {
            // only height provided
            success = imageProcessor.resizeImage(
              imagePreProcessor.rawFileDir + rawImageName,
              imagePreProcessor.processedFileDir + processedImageName,
              { height: parseInt(req.query.height as unknown as string) }
            );
          } else {
            // both height and width provided
            success = imageProcessor.resizeImage(
              imagePreProcessor.rawFileDir + rawImageName,
              imagePreProcessor.processedFileDir + processedImageName,
              {
                width: parseInt(req.query.width as unknown as string),
                height: parseInt(req.query.height as unknown as string)
              }
            );
          }
          if (await success) {
            res.locals.processedImageName =
              imagePreProcessor.processedFileDir + processedImageName;
          }
        }
      } else {
        res.locals.rawImageName = null;
        res.locals.processedImageName = null;
      }
    }
  } catch (err) {
    console.error(err);
  }

  next();
};

export default imageCache;
