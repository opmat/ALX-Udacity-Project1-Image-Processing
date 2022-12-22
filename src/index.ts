import express, { Request, Response } from 'express';
import imagePreProcessor from './utilities/imagePreProcessor';
import imageCache from './middlewares/imageCache';

const app = express();
const port = 3000;
const serverUrl = 'http://localhost';

app.get('/', (req: Request, res: Response) => {
    res.send("I'm in");
});

app.get('/view/:imageName', imageCache, (req: Request, res: Response) => {
    
    if (res.locals.processedImageName != null) {
        res.status(200).sendFile(res.locals.processedImageName, { root: __dirname + '/../' });
    } else {
        // res.status(400).send('Image Not Found');
        res.status(400).sendFile(imagePreProcessor.imageNotFound, { root: __dirname + '/../' });
    }
    
});

app.get('/gallery', (req: Request, res: Response) => {
    let galleryList: string[] = imagePreProcessor.getAllImages(imagePreProcessor.rawFileDir)
    res.json(galleryList);
});

app.post('/upload', (req: Request, res: Response) => {
    res.send("I'm in");
});


app.listen(port, () => {
    console.log(`Server Started on port ${port}. You can access via ${serverUrl}:${port}`);
})