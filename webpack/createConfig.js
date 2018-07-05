// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const path = require('path');
const appPath = process.cwd();
const resolveAppPath = relativePath => path.resolve(appPath, relativePath);

module.exports = ({ isDev }) => {
    return {
        mode: isDev ? 'development' : 'production',
        watch: isDev,
        context: resolveAppPath('frontend'),
        entry: './index',
        output: {
            filename: 'main.js',
            path: resolveAppPath('src/htdocs'),
            libraryTarget: 'amd',
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        externals: {
            '@plesk/ui-library': { amd: 'plesk-ui-library' },
        },
    };
};
