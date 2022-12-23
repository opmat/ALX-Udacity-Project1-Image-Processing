import sharp from 'sharp';

const resizeImage = async (srcImage: string, destImage: string, sizeOptions: {height?: number, width?: number}): Promise<boolean> => {
    var retValue:boolean = false;
    
    await sharp(srcImage)
        .resize({height: sizeOptions.height, width: sizeOptions.width})
        .toFile(destImage)
        .then(data => {
            // generated
            retValue = true;
            return retValue;
        })
        .catch(err => { 
            retValue = false;
            return retValue;
        });
    return retValue;
};

export default {
    resizeImage,
    // genThumbnail
}