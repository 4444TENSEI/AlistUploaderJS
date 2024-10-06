import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

const packageJson = fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8');
const packageObj = JSON.parse(packageJson);
const version = packageObj.version;

export default defineConfig({
    build: {
        outDir: `npm/`,
        lib: {
            entry: `src/v${version}/alist-uploader.js`,
            name: 'AlistUploader',
            fileName: (format) => `alist-uploader.js`,
            formats: ['umd'],
        },
        minify: 'terser',
        sourcemap: false,
    }
});
