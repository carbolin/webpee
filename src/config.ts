import { Size } from './size.interface';

export class WebpeeConfig {
  /** Allowed extensions to be converted, default '.jpg', '.jpeg', '.gif', '.png', '.tiff', '.svg' */
  allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.tiff', '.svg'];

  /** Folder to put in the image to be converted, default 'images' */
  watching = 'images';

  /** Folder to put in the generated image, default 'output' */
  output = 'output';

  /** Folder to move original image which has been converted, default 'converted' */
  converted = 'converted';

  /** Image Sizes being created through conversion, default [160x120, 400x300, 640x480, 960x720, 1280x960, 1920x1080] */
  sizes: Size[] = [
    { width: 160, height: 120 },
    { width: 400, height: 300 },
    { width: 640, height: 480 },
    { width: 960, height: 720 },
    { width: 1280, height: 960 },
    { width: 1920, height: 1080 },
  ];

  /** Quality, integer 1-100, default 80 */
  quality = 80;

  constructor(init?: Partial<WebpeeConfig>) {

    Object.assign(this, { ...init });
  }
}
