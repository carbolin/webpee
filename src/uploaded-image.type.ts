export type UploadedImage = {
  [key in ImageResolution]?: {
    readonly url: string;
    readonly path: string;
    readonly id: number;
    readonly title: string;
    size?: number;
  };
};

export enum ImageResolution {

  XXSmall = '160x120',
  XSmall = '400x300',
  Small = '640x480',
  Medium = '960x720',
  Large = '1280x960',
}
