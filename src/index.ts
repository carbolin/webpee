import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import sharp, { OutputInfo } from 'sharp';

import { WebpeeConfig } from './config';

// const fsPromises = fs.promises;

const input = 'input';

const inputDir = path.resolve(input);

const watcher = chokidar.watch(inputDir, {
    ignored: '*.txt',
    ignoreInitial: true,
    awaitWriteFinish: true
});

watcher.on('add', fullPath => {

    const fileDir = path.dirname(fullPath);

    const extension = path.extname(fullPath);

    const fileName = path.basename(fullPath);

    const croppedFilename = fileName.substr(0, fileName.lastIndexOf('.'));

    if (!WebpeeConfig.extensions.includes(extension) || fileName.startsWith('thumb@')) {

        throw new Error('Convertion aborted - wrong File Extension.');
    }

    const sizes = [
        { width: 160, height: 120 },
        { width: 400, height: 300 },
        // { width: 640, height: 480 },
        // { width: 960, height: 720 },
        // { width: 1280, height: 960 },
        // { width: 1920, height: 1080 },
    ];

    const convert = async () => {

        const output = await ensure();

        const data = sizes.map((size) => {

            const thumbName = `thumb@${size.width}x${size.height}_${croppedFilename}.webp`;

            const outputFilePath = path.join(output, thumbName);

            try {

                return sharp(fullPath)
                    .resize(size.width, size.height)
                    .webp({ quality: 70 })
                    .toFile(outputFilePath);

            } catch (error) {

                throw new Error('Error while Convertion.');
            }
        });

        return Promise.all(data);
    }

    const print = async (report: any): Promise<void> => {

        try {

            const output = await ensure();

            const dataTime = new Date().getTime();

            const fileName = `${dataTime}_report.json`;

            const outputFilePath = path.join(output, fileName);

            return fs.outputFile(outputFilePath, JSON.stringify(report));

        } catch (error) {
            throw new Error('Error while printing');
        }
    }

    const ensure = async (): Promise<string> => {

        const output: string = path.dirname(fullPath.replace('input', 'output'));

        const fullOutputPath: string = path.join(output, croppedFilename);

        try {

            await fs.ensureDir(fullOutputPath);

            return fullOutputPath;

        } catch (err) {
            throw new Error('Output directory was not created.');
        }

    };

    const moveFile = async () => {

        const convDir: string = path.dirname(fullPath.replace('input', 'converted'));      

        const convFullPath = path.join(convDir, fileName);

        try {
            await fs.ensureDir(convDir);

            return fs.move(fullPath, convFullPath);

        } catch (error) {
            throw new Error('Error while moving File.');
        }
    }

    const run = async (): Promise<void> => {

        const data = await convert();

        await print(data);

        await moveFile();
    }
    run();
});
