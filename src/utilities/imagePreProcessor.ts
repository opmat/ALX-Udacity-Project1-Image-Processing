// import {promise as fs} from fs;
import glob from 'glob';

const validInputImageFormat: string[] = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'];
const validOutputImageFormat: string[] = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff'];

const rawFileDir = './images/original/';
const processedFileDir = './images/refined/';
const thumbsFileDir = './images/thumbs/';
const imageNotFound = './images/original/notfound.jpg';

interface ImageOptions {
    width?: number;
    height?: number;
    format?: string;
}

const isValidInputImageFormat = (imageFormat: string):boolean => {
    return validInputImageFormat.includes(imageFormat);
};

const isValidOutputImageFormat = (imageFormat: string):boolean => {
    return validOutputImageFormat.includes(imageFormat);
};

const imageNameFormatter = (imageName:string, options:ImageOptions):string => {
    let extension: string = 'jpg';
    let newName: string = imageName;
    (Object.keys(options)).forEach((opt) => {
        if (opt === 'width') {
            newName += '_w' + options[opt];
        }
        if (opt === 'height') {
            newName += '_h' + options[opt];
        }
        if (opt === 'format') {
            extension = (options[opt] as unknown) as string;
        }
    })
    // (Object.keys(options) as Array<keyof ImageOptions>).forEach((option) => {
    //     newName += imgOptionShortname[option]
    // })
    // options.forEach((option) => {
    //     newName = imgOptionShortname[option]
    //     console.log(`There are ${options[option]} ${option}`);
    // });
    extension = extension == ''? '.jpg' : '.'+extension;
    return newName + extension;
};


const getImage = (sourceDir:string, imageName:string):string => {
    return '';
};

const getAllImages = (searchDir:string, imageType:string='*'):string[] => {
    return glob.sync(`${searchDir}/*.${imageType}`);;
}


export default {
    isValidInputImageFormat,
    isValidOutputImageFormat,
    getImage,
    getAllImages,
    imageNameFormatter,
    rawFileDir,
    processedFileDir,
    thumbsFileDir,
    imageNotFound
};