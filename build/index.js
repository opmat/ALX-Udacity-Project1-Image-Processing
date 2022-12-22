"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagePreProcessor_1 = __importDefault(require("./utilities/imagePreProcessor"));
const imageCache_1 = __importDefault(require("./middlewares/imageCache"));
const app = (0, express_1.default)();
const port = 3000;
const serverUrl = 'http://localhost';
app.get('/', (req, res) => {
    res.send("I'm in");
});
app.get('/view/:imageName', imageCache_1.default, (req, res) => {
    if (res.locals.processedImageName != null) {
        res.status(200).sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    }
    else {
        res.status(400).send('Not Found');
    }
});
app.get('/gallery', (req, res) => {
    let galleryList = imagePreProcessor_1.default.getAllImages(imagePreProcessor_1.default.rawFileDir);
    res.json(galleryList);
});
app.post('/upload', (req, res) => {
    res.send("I'm in");
});
app.listen(port, () => {
    console.log(`Server Started on port ${port}. You can access via ${serverUrl}:${port}`);
});
