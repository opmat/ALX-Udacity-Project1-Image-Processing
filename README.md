
# Image Processing API

A simple API built with Node.JS, Typescript, and Express for manipulation of images of different formats. The API is able to resize a given image on the fly and also cache generated resized image. The generated image is repushed without regenrated the same image anytime the image with same parameter is requested.

Views have also been added to provide a virtual interface for users to connect and interact with the platform.

This API is the Version 1.0.0 and future version will be adding other features.

This project is based on the ALX Udacity Fullstack JS Course.


## Installation

Install the project with npm

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


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## API Reference

### View Image

This endpoint load any of the images existing on the server with any width and height as provided in the API call. The endpoint resizes the image based on the height and width provided, saves the image to disk and serves the image anytime the image is requested with the same width and height.

```http
  GET /view/${imageName}?width=${width}&height=${height}&format=${format}
```

#### Request Parameter
The request Parameter is copulsory
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageName` | `string` | **Required**. The name of the image (without file extension) on disk to resize and load |


#### Request Queries (_Optional_)
All request queries are optional and the endpoint will serve the original image if not query is provided
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `width` | `integer` | **Optional**. The width of the new image requested, this will initiate resizing of the original image based on the provided width |
| `height` | `integer` | **Optional**. The height of the new image requested, this will initiate resizing of the original image based on the provided height |
| `format` | `string` | **Optional - Default: jpg**. The mimetype of the requested image. This is only essential when an image with a different mimetype other than `jpg` is requested. Supported formats are `'jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'` |


This endpoint can also be used in `img` tags on web pages as found below assuming `floral` is an image called `floral.jpg` on the server;

```html
  <img src='/view/floral' />
```

To load a resized `floral` image with width of 420px and height of 250px, you will have;

```html
  <img src='/view/floral?width=420&width=250' />
```
  


### Download Image

This endpoint initiates a download of any of the images existing on the server with any width and height as provided in the API call. The endpoint resizes the image based on the height and width provided, saves the image to disk and initiates the download of the image anytime the image is requested with the same width and height.

```http
  GET /download/${imageName}?width=${width}&height=${height}&format=${format}
```

#### Request Parameter
The request Parameter is copulsory
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageName` | `string` | **Required**. The name of the image (without file extension) on disk to resize and download |


#### Request Queries (_Optional_)
All request queries are optional and the endpoint will serve the original image if not query is provided
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `width` | `integer` | **Optional**. The width of the new image requested, this will initiate resizing and download of the original image based on the provided width |
| `height` | `integer` | **Optional**. The height of the new image requested, this will initiate resizing and download of the original image based on the provided height |
| `format` | `string` | **Optional - Default: jpg**. The mimetype of the requested image. This is only essential when an image with a different mimetype other than `jpg` is requested. Supported formats are `'jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'` |

This endpoint can also be used in `a` tags on web pages as found below assuming `floral` is an image called `floral.jpg` on the server;

```html
  <img src='/download/floral' />
```

To download a resized `floral` image with width of 420px and height of 250px, you will have;

```html
  <img src='/download/floral?width=420&width=250' />
```


### Upload Image

Initiates the upload of provided source image from a form whose `enctype="multipart/form-data"` and the file field named `image`

```http
  POST /upload
```


### Web View

A web view has also been provided for easy navigation and use of the API. This can be accessed by visiting the root of the API


```http
  GET /
```




## Screenshots

![App Screenshot](https://drive.google.com/file/d/1hoq3QK4bRkvbpESANHm0VYUDzDt1difJ/view?usp=share_link)

