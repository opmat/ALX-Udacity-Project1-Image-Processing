
# Image Processing API

A simple API built with Node.JS, Typescript, and Express for manipulation of images of different formats. The API is able to resize a given image on the fly and also cache generated resized image. The generated image is repushed without regenrated the same image anytime the image with same parameter is requested.

Views have also been added to provide a virtual interface for users to connect and interact with the platform.

This API is the Version 1.0.0 and future version will be adding other features.

This project is based on the ALX Udacity Fullstack JS Course.

## Installation

Clone or downlad the repository and you can then install the project with npm. You first `cd` into the repository directory

```bash
  cd project-directory
  npm install
```

To run the server on development mode, run the following

```bash
  npm run start
```

To run the server on production mode, run the following

```bash
  npm run build
  npm run start-prod
```

To build and run test, run the following

```bash
  npm run test
```

## Environment Variables

To run this project, you can choose to add environment variable for `PORT` to your .env file, specify the port number the express server would run on else the default port `3000` will be used.

`PORT`

## Supported Image Formats

### Support Input Image Formats

The supported image formats for input are:

```text
  'jpg',
  'png',
  'webp',
  'gif',
  'avif',
  'tiff',
  'svg'
```

### Support Output Image Formats

The supported image formats for input are:

```text
  'jpg',
  'png',
  'webp',
  'gif',
  'avif',
  'tiff'
```

## API Reference

### 1. View Image Endpoint

This endpoint load any of the images existing on the server with any width and height as provided in the API call. The endpoint resizes the image based on the height and width provided, saves the image to disk and serves the image anytime the image is requested with the same width and height.

```http
  GET /view/${imageName}?width=${width}&height=${height}&format=${format}
```

#### 1.1 View Image - Request Parameter

The request Parameter is compulsory
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageName` | `string` | **Required**. The name of the image (without file extension) on disk to resize and load |

#### 1.2 View Image -Request Queries (_Optional_)

All request queries are optional and the endpoint will serve the original image if not query is provided
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `width` | `integer` | **Optional**. The width of the new image requested, this will initiate resizing of the original image based on the provided width |
| `height` | `integer` | **Optional**. The height of the new image requested, this will initiate resizing of the original image based on the provided height |
| `format` | `string` | **Optional - Default: jpg**. The mimetype of the requested image. This is only essential when an image with a different mimetype other than `jpg` is requested. Supported formats are `'jpg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'` |

This endpoint can also be used in `img` tags on web pages as found below assuming `floral` is an image called `floral.jpg` on the server;

```html
  <img src='/view/floral' />
```

To load a resized `floral` image with width of 420px and height of 250px, you will have;

```html
  <img src='/view/floral?width=420&width=250' />
```
  
### 2. Download Image Endpoint

This endpoint initiates a download of any of the images existing on the server with any width and height as provided in the API call. The endpoint resizes the image based on the height and width provided, saves the image to disk and initiates the download of the image anytime the image is requested with the same width and height.

```http
  GET /download/${imageName}?width=${width}&height=${height}&format=${format}
```

#### 2.1 Download Image - Request Parameter

The request Parameter is compulsory
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageName` | `string` | **Required**. The name of the image (without file extension) on disk to resize and download |

#### 2.2 Download Image - Request Queries (_Optional_)

All request queries are optional and the endpoint will serve the original image if not query is provided
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `width` | `integer` | **Optional**. The width of the new image requested, this will initiate resizing and download of the original image based on the provided width |
| `height` | `integer` | **Optional**. The height of the new image requested, this will initiate resizing and download of the original image based on the provided height |
| `format` | `string` | **Optional - Default: jpg**. The mimetype of the requested image. This is only essential when an image with a different mimetype other than `jpg` is requested. Supported formats are `'jpg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'` |

This endpoint can also be used in `a` tags on web pages as found below assuming `floral` is an image called `floral.jpg` on the server;

```html
  <a href='/download/floral' />
```

To download a resized `floral` image with width of 420px and height of 250px, you will have;

```html
  <a href='/download/floral?width=420&width=250' />
```

### 3. Upload Image

Initiates the upload of provided source image from a form whose `enctype="multipart/form-data"` and the file field named `image`

```http
  POST /upload
```

### 4. Image Format Conversion Endpoint

This endpoint initiates a conversion of any of the images existing on the server to the provided format in the API call, saves the new image to disk and displays it.

```http
  GET /convertImage/${imageName}/${convertFrom}/${convertTo}
```

#### 4.1 Image Format Conversion - Request Parameters

The request Parameters are compulsory
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageName` | `string` | **Required**. The name of the image (without file extension) on disk to convert |
| `convertFrom` | `string` | **Required**. The mimetype of the image you want to. Note that the image must exist on the server. Supported formats are `'jpg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'` |
| `convertTo` | `string` | **Required**. The mimetype to convert the image to. Supported formats are `'jpg', 'png', 'webp', 'gif', 'avif', 'tiff'` |

### 5. Web View

A web view has also been provided for easy navigation and use of the API. This can be accessed by visiting the root of the API

```http
  GET /
```

## Screenshots

![App Screenshot](https://ffesongl.sirv.com/ALX%20Udacity%20Projects/Project%201%20-%20Image%20Manipulator/localhost_3000_gallery.png)

![App Screenshot 2](https://ffesongl.sirv.com/ALX%20Udacity%20Projects/Project%201%20-%20Image%20Manipulator/Screenshot%20(1070).png)
