import imagePP from '../../utilities/imagePreProcessor';

describe('file validity test suites', () => {
  const inputImage = 'fjord';
  const width = 0;
  const height = 0;
  const inputImageType = 'jpg';
  const outputImageType = 'jpg';
  const wrongOutputImageType = 'svg';

  it('checks if input image type is valid', () => {
    const isValid = imagePP.isValidInputImageFormat(inputImageType);
    expect(isValid).toBeTruthy();
  });

  it('checks if output image type is valid', () => {
    const isValid = imagePP.isValidOutputImageFormat(outputImageType);
    expect(isValid).toBeTruthy();
  });

  it('confirms wrong output image format will be rejected', () => {
    const isValid = imagePP.isValidOutputImageFormat(wrongOutputImageType);
    expect(isValid).toBeFalse();
  });

  it('expects default image file name to be returned if file does not exist', () => {});
});

describe('file property test', () => {
  it('checks if file size conversion is correct', () => {
    expect(imagePP.convertSizes(3613944)).toBe('3.45MB');
  });

  it('checks if processed image name is correctly generated using default filetype', () => {
    expect(imagePP.imageNameFormatter('testImg', {})).toEqual('testImg.jpg');
  });

  it('checks if processed image name will not generate with default filetype', () => {
    expect(
      imagePP.imageNameFormatter('testImg', { format: 'png' })
    ).not.toEqual('testImg.jpg');
  });
});

describe('Image Retrieval test Suite', () => {
  it('should retrieve more than 1 image file', () => {
    expect(imagePP.getAllImagesSync(imagePP.rawFileDir).length).toBeGreaterThan(
      1
    );
  });

  it('should not return any image for invalid directory', () => {
    expect(imagePP.getAllImagesSync('./images/craft').length).toBeFalsy();
  });
});
