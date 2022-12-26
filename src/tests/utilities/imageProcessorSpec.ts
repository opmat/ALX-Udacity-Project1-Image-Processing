import imageProcessor from '../../utilities/imageProcessor';
import path from 'path';
import sharp from 'sharp';

describe('Image Resizing test Suite', () => {
  const rawFilePath = path.join(
    __dirname,
    '../../../images/original/palmtunnel.jpg'
  );
  it('should return true for positive height and width resizing values', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/palmtunnel_w840_h540.jpg'
    );
    const result = await imageProcessor.resizeImage(rawFilePath, newFilePath, {
      height: 540,
      width: 840
    });
    expect(result).toBeTrue();
  });

  it('should return true for implied undefined height and/or width resizing values', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/palmtunnel_w840.jpg'
    );
    const result = await imageProcessor.resizeImage(rawFilePath, newFilePath, {
      width: 840
    });
    expect(result).toBeTrue();
  });

  it('should return true for explicit undefined height and/or width resizing values', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/palmtunnel_w1020.jpg'
    );
    const result = await imageProcessor.resizeImage(rawFilePath, newFilePath, {
      height: undefined,
      width: 1020
    });
    expect(result).toBeTrue();
  });

  it('should return true for negative height and/or width resizing values', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/palmtunnel_w830_h-200.jpg'
    );
    const resizer = await imageProcessor.resizeImage(rawFilePath, newFilePath, {
      height: -200,
      width: 830
    });
    expect(resizer).toBeFalse();
  });

  it('should return true for zero height and/or width resizing values', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/palmtunnel_w830_h0.jpg'
    );
    const resizer = await imageProcessor.resizeImage(rawFilePath, newFilePath, {
      height: 0,
      width: 830
    });
    expect(resizer).toBeFalse();
  });
});

describe('Image Conversion test Suite', () => {
  const rawFilePath = path.join(
    __dirname,
    '../../../images/original/parks-mountains.png'
  );
  it('should return true for support file format conversion', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/parks-mountains.jpg'
    );
    const newFormat = 'jpg' as unknown as sharp.AvailableFormatInfo;
    const result = await imageProcessor.convertImageFormat(
      rawFilePath,
      newFilePath,
      newFormat
    );
    expect(result).toBeTrue();
  });

  it('should return false for unsupported file format conversion', async () => {
    const newFilePath = path.join(
      __dirname,
      '../../../images/refined/parks-mountains.svg'
    );
    const newFormat = 'svg' as unknown as sharp.AvailableFormatInfo;
    const result = await imageProcessor.convertImageFormat(
      rawFilePath,
      newFilePath,
      newFormat
    );
    expect(result).toBeFalse();
  });
});
