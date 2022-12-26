/* eslint-disable @typescript-eslint/no-inferrable-types */
import glob from 'glob';
import path from 'path';

const validInputImageFormat: string[] = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'avif',
  'tiff',
  'svg'
];
const validOutputImageFormat: string[] = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'avif',
  'tiff'
];

const rawFileDir: string = './images/original/';
const processedFileDir: string = './images/refined/';
const thumbsFileDir: string = './images/thumbs/';
const imageNotFound: string = './images/original/notfound.jpg';

interface ImageOptions {
  width?: number;
  height?: number;
  format?: string;
}

const isValidInputImageFormat = (imageFormat: string): boolean => {
  return validInputImageFormat.includes(imageFormat);
};

const isValidOutputImageFormat = (imageFormat: string): boolean => {
  return validOutputImageFormat.includes(imageFormat);
};

const imageNameFormatter = (
  imageName: string,
  options: ImageOptions
): string => {
  let extension = 'jpg';
  let newName: string = imageName;
  Object.keys(options).forEach((opt) => {
    if (opt === 'width') {
      newName += '_w' + options[opt];
    }
    if (opt === 'height') {
      newName += '_h' + options[opt];
    }
    if (opt === 'format') {
      extension = options[opt] as unknown as string;
    }
  });
  extension = extension == '' ? '.jpg' : '.' + extension;
  return newName + extension;
};

const getAllImagesSync = (searchDir: string, imageType = '*'): object[] => {
  const imgList: object[] = [];
  const files: string[] = glob.sync(`${searchDir}/*.${imageType}`);
  files.forEach((ifile) => {
    imgList.push({
      name: path.parse(ifile).name,
      ext: path.extname(ifile).substring(1),
      dir: path.parse(ifile).dir + '/'
    });
    // console.log(imgList)
  });

  return imgList;
};

const getAllImages = async (
  searchDir: string,
  imageType = '*'
): Promise<object[]> => {
  const imgList: object[] = [];

  await glob(`${searchDir}/*.${imageType}`, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((ifile) => {
        imgList.push({
          name: path.parse(ifile).name,
          ext: path.parse(ifile).ext,
          dir: path.parse(ifile).dir + '/'
        });
        console.log(imgList);
      });
    }
    return imgList;
  });
  return imgList;
};

const convertSizes = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (size === 0) {
    return 'n/a';
  }
  const i = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1
  );
  if (i === 0) {
    return `${size}${units[i]}`;
  }
  return `${(size / 1024 ** i).toFixed(2)}${units[i]}`;
};

export default {
  isValidInputImageFormat,
  isValidOutputImageFormat,
  getAllImages,
  getAllImagesSync,
  imageNameFormatter,
  convertSizes,
  rawFileDir,
  processedFileDir,
  thumbsFileDir,
  imageNotFound
};
