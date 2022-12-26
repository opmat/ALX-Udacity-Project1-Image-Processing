"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagePreProcessor_1 = __importDefault(require("./utilities/imagePreProcessor"));
const imageCache_1 = __importDefault(require("./middlewares/imageCache"));
const imageUploader_1 = __importDefault(require("./middlewares/imageUploader"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./utilities/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const serverUrl = 'http://localhost';
app.set('view engine', 'ejs');
app.use(express_1.default.static('views'));
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Image Manipulator - Home' });
});
app.get('/view/:imageName', imageCache_1.default.cacheImage, (req, res) => {
    if (res.locals.processedImageName != null) {
        logger_1.default.info(`/view/:imageName - ${req.params.imageName} - ${JSON.stringify(req.query)} Image processed`);
        res
            .status(200)
            .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    }
    else {
        logger_1.default.error(`/view/:imageName - ${req.params.imageName} - ${JSON.stringify(req.query)} ${res.locals.error}`);
        res.status(400).send(res.locals.error);
        // res.status(400).sendFile(imagePreProcessor.imageNotFound, {
        //   root: __dirname + '/../'
        // });
    }
});
app.get('/download/:imageName', imageCache_1.default.cacheImage, (req, res) => {
    res
        .status(200)
        .download(res.locals.processedImageName, path_1.default.basename(res.locals.processedImageName), (err) => {
        if (err) {
            logger_1.default.error(`/download/:imageName - ${req.params.imageName} - ${JSON.stringify(req.query)} Image Not Found`);
            res.status(500).send({
                message: 'Could not download the file. ' + err
            });
        }
    });
});
app.get('/process', (req, res) => {
    res.send("I'm in");
});
app.get('/gallery', (req, res) => {
    const galleryList = imagePreProcessor_1.default.getAllImagesSync(imagePreProcessor_1.default.rawFileDir);
    if (galleryList.length > 0) {
        logger_1.default.info(`/gallery - ${JSON.stringify(req.query)} loaded`);
        res.status(200).render('gallery', {
            pageTitle: 'Image Manipulator - Gallery',
            gallery: galleryList
        });
    }
    else {
        logger_1.default.info(`/gallery - ${JSON.stringify(req.query)} Image Gallery could not be loaded for request`);
        res.status(400).render('gallery', {
            pageTitle: 'Image Manipulator - Gallery',
            gallery: []
        });
    }
});
app.get('/convertImage/:imageName/:convertFrom/:convertTo', imageCache_1.default.imageConvert, (req, res) => {
    if (res.locals.processedImageName != null) {
        logger_1.default.info(`/convertImage/:imageName/:convertFrom/:convertTo - ${JSON.stringify(req.params)} processed`);
        res
            .status(200)
            .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    }
    else {
        logger_1.default.error(`/convertImage/:imageName/:convertFrom/:convertTo - ${JSON.stringify(req.params)} failed`);
        res.status(500).send('An Unknown error occured');
    }
});
app.post('/upload', (req, res) => {
    imageUploader_1.default.uploadSingleImage(req, res, (err) => {
        var _a;
        // error occured during upload
        if (err) {
            logger_1.default.error(`/upload - ${req.query} failed to upload with message: ${err.message}`);
            res.status(500).render('uploadSuccess', {
                pageTitle: 'Image Manipulator - Upload Error',
                message: err.message,
                status: 0
            });
        }
        // no error
        logger_1.default.info(`/upload - ${req.query} completed`);
        //convert file size to readable format
        const filesize = imagePreProcessor_1.default.convertSizes((_a = req.file) === null || _a === void 0 ? void 0 : _a.size);
        res.status(200).render('uploadSuccess', {
            pageTitle: 'Image Manipulator - Upload Success',
            fileParam: req.file,
            status: 1,
            filesize: filesize
        });
    });
});
app.get('/upload', (req, res) => {
    res.render('uploader', { pageTitle: 'Image Manipulator - Upload Image' });
});
app.listen(port, () => {
    console.log(`Server Started on port ${port}. You can access via ${serverUrl}:${port}`);
});
exports.default = app;
