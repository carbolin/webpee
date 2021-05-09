# webpee 🚽

A lightweight Node JS cli tool to convert images in <a href="https://en.wikipedia.org/wiki/WebP">WebP</a> format in varying dimensions. 
Resizing is done with <a href="https://github.com/lovell/sharp">Sharp</a> which is typically 4x-5x faster 💨 than using the quickest ImageMagick 
and GraphicsMagick.

## Documentation 📃
Clone the repository and run `npm install`.

Im using <a href="https://github.com/paulmillr/chokidar">Chokidar</a> to watch 👀 for new images to be converted in the input folder.
🚂 Basic logging is done with <a href="https://github.com/winstonjs/winston">Winston</a>.
