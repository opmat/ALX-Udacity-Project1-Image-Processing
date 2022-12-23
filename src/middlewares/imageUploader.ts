import multer from 'multer';
import path from 'path';
// import express, { Request, Response }   from 'express';
import imagePreProcessor from '../utilities/imagePreProcessor'

/**
 * Image upload Parts
 * 
 */
 var imageStorage = multer.diskStorage({
    destination: (req, file, cb) =>{ 
        cb(null, "./images/original");
    },
    filename: (req, file, cb)=>{
        const ext:string = path.extname(file.originalname).substring(1);         
        var newFileName:string = path.parse(file.originalname).name;
        // path.extname((req.query.filename as unknown) as string).substring(1);
        // var newFileName: string = 
        //     (!(typeof passedFileName === 'undefined' || passedFileName === null || passedFileName === '')) ?
        //         passedFileName : path.parse(file.originalname).name;
        newFileName = newFileName.replace(' ', '-') + `.${ext}`;
        cb(null, newFileName); 
    }
});


const imageUploader = multer({storage: imageStorage, fileFilter: (req, file, cb) =>{
    const ext:string = path.extname(file.originalname).substring(1);
    if(!imagePreProcessor.isValidInputImageFormat(ext)) { 
        // if file type is not a valid image format, return error
        return cb(new Error('Invalid image file uploaded'))
    }
    cb(null, true);
}
});

const uploadSingleImage = imageUploader.single('image');


export default {
    imageUploader,
    uploadSingleImage
}