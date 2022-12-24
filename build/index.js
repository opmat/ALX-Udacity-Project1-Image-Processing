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
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const serverUrl = 'http://localhost';
app.set('view engine', 'ejs');
app.use(express_1.default.static('views'));
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Image Manipulator - Home' });
});
app.get('/view/:imageName', imageCache_1.default, (req, res) => {
    if (res.locals.processedImageName != null) {
        res
            .status(200)
            .sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    }
    else {
        // res.status(400).send('Image Not Found');
        res
            .status(400)
            .sendFile(imagePreProcessor_1.default.imageNotFound, { root: __dirname + '/../' });
    }
});
app.get('/download/:imageName', imageCache_1.default, (req, res) => {
    res
        .status(200)
        .download(res.locals.processedImageName, path_1.default.basename(res.locals.processedImageName), (err) => {
        if (err) {
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
    // res.json(galleryList);
    if (galleryList.length > 0) {
        res.status(200).render('gallery', {
            pageTitle: 'Image Manipulator - Gallery',
            gallery: galleryList
        });
    }
    else {
        res.status(400).render('gallery', {
            pageTitle: 'Image Manipulator - Gallery',
            gallery: []
        });
    }
});
app.get('/convertTo/:imageToConvert/:newImageName/:newImageFormat', (req, res) => {
    // let galleryList: string[] = imagePreProcessor.getAllImages(imagePreProcessor.rawFileDir)
    // res.json(galleryList);
    const cimage = req.params.image;
    res.send(`Test Conversion ${cimage}`);
});
app.post('/upload', (req, res) => {
    imageUploader_1.default.uploadSingleImage(req, res, function (err) {
        var _a;
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
