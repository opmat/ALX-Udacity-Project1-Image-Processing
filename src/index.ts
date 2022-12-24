import express, { Request, Response } from 'express';
import imagePreProcessor from './utilities/imagePreProcessor';
import imageCache from './middlewares/imageCache';
import imageUploader from './middlewares/imageUploader';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const serverUrl = 'http://localhost';

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', (req: Request, res: Response) => {
  res.render('index', { pageTitle: 'Image Manipulator - Home' });
});

app.get(
  '/view/:imageName',
  imageCache.cacheImage,
  (req: Request, res: Response) => {
    if (res.locals.processedImageName != null) {
      res
        .status(200)
        .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    } else {
      // res.status(400).send('Image Not Found');
      res.status(400).sendFile(imagePreProcessor.imageNotFound, {
        root: __dirname + '/../'
      });
    }
  }
);

app.get(
  '/download/:imageName',
  imageCache.cacheImage,
  (req: Request, res: Response) => {
    res
      .status(200)
      .download(
        res.locals.processedImageName,
        path.basename(res.locals.processedImageName),
        (err) => {
          if (err) {
            res.status(500).send({
              message: 'Could not download the file. ' + err
            });
          }
        }
      );
  }
);

app.get('/process', (req: Request, res: Response) => {
  res.send("I'm in");
});

app.get('/gallery', (req: Request, res: Response) => {
  const galleryList: object[] = imagePreProcessor.getAllImagesSync(
    imagePreProcessor.rawFileDir
  );
  // res.json(galleryList);
  if (galleryList.length > 0) {
    res.status(200).render('gallery', {
      pageTitle: 'Image Manipulator - Gallery',
      gallery: galleryList
    });
  } else {
    res.status(400).render('gallery', {
      pageTitle: 'Image Manipulator - Gallery',
      gallery: []
    });
  }
});

app.get(
  '/convertImage/:imageName/:convertFrom/:convertTo',
  imageCache.imageConvert,
  (req: Request, res: Response) => {
    if (res.locals.processedImageName != null) {
      res
        .status(200)
        .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    } else {
      res.status(500).send('An Unknown error occured');
      // res.status(400).sendFile(imagePreProcessor.imageNotFound, {
      //   root: __dirname + '/../'
      // });
    }
  }
);

app.post('/upload', (req: Request, res: Response) => {
  imageUploader.uploadSingleImage(req, res, function (err) {
    // error occured during upload
    if (err) {
      return res.status(500).render('uploadSuccess', {
        pageTitle: 'Image Manipulator - Upload Error',
        message: err.message,
        status: 0
      });
    }

    // no error
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

app.get('/upload', (req: Request, res: Response) => {
  res.render('uploader', { pageTitle: 'Image Manipulator - Upload Image' });
});

app.listen(port, () => {
  console.log(
    `Server Started on port ${port}. You can access via ${serverUrl}:${port}`
  );
});

export default app;
