import sharp from 'sharp';

const resizeImage = async (
  srcImage: string,
  destImage: string,
  sizeOptions: { height?: number; width?: number }
): Promise<boolean> => {
  let retValue = false;

  await sharp(srcImage)
    .resize({ height: sizeOptions.height, width: sizeOptions.width })
    .toFile(destImage)
    .then((data) => {
      // generated
      console.log(data);
      retValue = true;
      return retValue;
    })
    .catch((err) => {
      console.log(err);
      retValue = false;
      return retValue;
    });
  return retValue;
};

export default {
  resizeImage
  // genThumbnail
};
