import express, { Request, Response } from 'express';
import imagePreProcessor from './utilities/imagePreProcessor';
import imageCache from './middlewares/imageCache';
import imageUploader from './middlewares/imageUploader';
import path from 'path';
import logger from './utilities/logger';

const app = express();
const port = process.env.PORT || 3000;
const serverUrl = 'http://localhost';

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', (req: Request, res: Response): void => {
  res.render('index', { pageTitle: 'Image Manipulator - Home' });
});

app.get(
  '/view/:imageName',
  imageCache.cacheImage,
  (req: Request, res: Response): void => {
    if (res.locals.processedImageName != null) {
      logger.info(
        `/view/:imageName - ${req.params.imageName} - ${JSON.stringify(
          req.query
        )} Image processed`
      );
      res
        .status(200)
        .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    } else {
      logger.error(
        `/view/:imageName - ${req.params.imageName} - ${JSON.stringify(
          req.query
        )} Image Not Found`
      );
      res.status(400).sendFile(imagePreProcessor.imageNotFound, {
        root: __dirname + '/../'
      });
    }
  }
);

app.get(
  '/download/:imageName',
  imageCache.cacheImage,
  (req: Request, res: Response): void => {
    res
      .status(200)
      .download(
        res.locals.processedImageName,
        path.basename(res.locals.processedImageName),
        (err) => {
          if (err) {
            logger.error(
              `/download/:imageName - ${
                req.params.imageName
              } - ${JSON.stringify(req.query)} Image Not Found`
            );
            res.status(500).send({
              message: 'Could not download the file. ' + err
            });
          }
        }
      );
  }
);

app.get('/process', (req: Request, res: Response): void => {
  res.send("I'm in");
});

app.get('/gallery', (req: Request, res: Response): void => {
  const galleryList: object[] = imagePreProcessor.getAllImagesSync(
    imagePreProcessor.rawFileDir
  );
  if (galleryList.length > 0) {
    logger.info(`/gallery - ${JSON.stringify(req.query)} loaded`);
    res.status(200).render('gallery', {
      pageTitle: 'Image Manipulator - Gallery',
      gallery: galleryList
    });
  } else {
    logger.info(
      `/gallery - ${JSON.stringify(
        req.query
      )} Image Gallery could not be loaded for request`
    );
    res.status(400).render('gallery', {
      pageTitle: 'Image Manipulator - Gallery',
      gallery: []
    });
  }
});

app.get(
  '/convertImage/:imageName/:convertFrom/:convertTo',
  imageCache.imageConvert,
  (req: Request, res: Response): void => {
    if (res.locals.processedImageName != null) {
      logger.info(
        `/convertImage/:imageName/:convertFrom/:convertTo - ${JSON.stringify(
          req.params
        )} processed`
      );
      res
        .status(200)
        .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    } else {
      logger.error(
        `/convertImage/:imageName/:convertFrom/:convertTo - ${JSON.stringify(
          req.params
        )} failed`
      );
      res.status(500).send('An Unknown error occured');
    }
  }
);

app.post('/upload', (req: Request, res: Response): void => {
  imageUploader.uploadSingleImage(req, res, (err) => {
    // error occured during upload
    if (err) {
      logger.error(
        `/upload - ${req.query} failed to upload with message: ${err.message}`
      );
      res.status(500).render('uploadSuccess', {
        pageTitle: 'Image Manipulator - Upload Error',
        message: err.message,
        status: 0
      });
    }

    // no error
    logger.info(`/upload - ${req.query} completed`);
    //convert file size to readable format
    const filesize = imagePreProcessor.convertSizes(
      req.file?.size as unknown as number
    );
    res.status(200).render('uploadSuccess', {
      pageTitle: 'Image Manipulator - Upload Success',
      fileParam: req.file,
      status: 1,
      filesize: filesize
    });
  });
});

app.get('/upload', (req: Request, res: Response): void => {
  res.render('uploader', { pageTitle: 'Image Manipulator - Upload Image' });
});

app.listen(port, (): void => {
  console.log(
    `Server Started on port ${port}. You can access via ${serverUrl}:${port}`
  );
});

export default app;
