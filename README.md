# 🚽 Webpee 

A lightweight Node JS cli tool written in Typescript to convert images into <a href="https://en.wikipedia.org/wiki/WebP">WebP</a> format.
Sizes and quality are configurable.

Resizing is done with <a href="https://github.com/lovell/sharp">Sharp</a> which is typically 4x-5x faster 💨 than using the quickest ImageMagick 
and GraphicsMagick.

## 📃 Documentation

Clone or download the repo and run the following commands in the root directory of the project.
1. `npm install`
2. `tsc`
3. `npm start`

When using default WebpeeConfig just pass in the image you want to convert into 'images' folder. 🚽 will do the 👟.

I'm using <a href="https://github.com/paulmillr/chokidar">Chokidar</a> to listen 👀 for new images in the 'images' folder.
🚂 Basic logging is realized with <a href="https://github.com/winstonjs/winston">Winston</a>.
