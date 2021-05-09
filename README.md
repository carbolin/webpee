# 🚽 webpee 

A lightweight Typescript Node JS cli tool to convert images in <a href="https://en.wikipedia.org/wiki/WebP">WebP</a> format in varying dimensions. 
Resizing is done with <a href="https://github.com/lovell/sharp">Sharp</a> which is typically 4x-5x faster 💨 than using the quickest ImageMagick 
and GraphicsMagick.

## 📃 Documentation

Clone or download the repository and run following commands.
* `npm install`
* `tsc`
* `node ./build/index.js`

If you use the default WebpeeConfig just move images to 'images' folder and webpee will do the rest 👟

Im using <a href="https://github.com/paulmillr/chokidar">Chokidar</a> to watch 👀 for new images to be converted in the input folder.
🚂 Basic logging is done with <a href="https://github.com/winstonjs/winston">Winston</a>.
