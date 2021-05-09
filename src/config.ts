import { Size } from './size.interface';

export class WebpeeConfig {
  /** Allowed extensions to be converted. */
  allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.tiff', '.svg'];

  /** Folder to put in the images to be converted. */
  watching = 'images';

  /** Folder to put in the generated images images. */
  output = 'output';

  /** Folder to move original image which has been converted. */
  converted = 'converted';

  /** Image Sizes being created through conversion. */
  sizes: Size[] = [
    { width: 160, height: 120 },
    { width: 400, height: 300 },
    { width: 640, height: 480 },
    { width: 960, height: 720 },
    { width: 1280, height: 960 },
    { width: 1920, height: 1080 },
  ];

  /** Quality, integer 1-100 (optional, default 80). */
  quality = 70;

  constructor(init?: Partial<WebpeeConfig>) {

    Object.assign(this, { ...init });
  }
}
