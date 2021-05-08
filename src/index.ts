
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { WebpeeConfig } from './config';

const root = WebpeeConfig.rootPath;

let input = "/input/pexels-pixabay-210186.jpg";

input = path.join(root, input);

// const fileDir = path.dirname(input);

// console.log('fileDir', fileDir);

const extension = path.extname(input);

// console.log('extension', extension);

const fileName = path.basename(input);

console.log('fileName', fileName);

const croppedFilename = fileName.substr(0, fileName.lastIndexOf('.'));

if (!WebpeeConfig.extensions.includes(extension) || fileName.startsWith('thumb@')) {

    throw new Error('Convertion aborted - wrong File Extension.');
}

const sizes = [
    { width: 160, height: 120 },
    { width: 400, height: 300 },
    { width: 640, height: 480 },
    { width: 960, height: 720 },
    { width: 1280, height: 960 },
    { width: 1920, height: 1080 },
];

const convert = () => {

    sizes.map(async size => {

        const thumbName = `thumb@${size.width}x${size.height}_${croppedFilename}.webp`;

        const output = WebpeeConfig.output || 'output';

        const outputFilePath = path.join(root, output, thumbName);

        console.log(outputFilePath);

        const metadata: sharp.OutputInfo[] = []

        try {

            const data = await sharp(input)
                .resize(size.width, size.height)
                .webp({ quality: 70 })
                .toFile(outputFilePath);

            metadata.push(data);

            return console.log(data);

        } catch (error) {
            return console.error(error);
        }
    });



}

const print = (report: any): void => {

    const fileName = 'report.json';

    const dataTime = new Date().getTime();

    fs.writeFile(`../output/${dataTime}_${fileName}`, JSON.stringify(report), () => {

        console.log(`Report written to ${dataTime}_${fileName}`);

    });
}


convert();

