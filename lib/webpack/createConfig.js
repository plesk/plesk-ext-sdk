// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const fs = require('fs-extra');
const path = require('path');
const appPath = process.cwd();
const resolveAppPath = relativePath => path.resolve(appPath, relativePath);
const createBabelConfig = require('../babel/createConfig');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const loadCustomConfig = (config, params) => {
    const configPath = resolveAppPath('extension.config.js');
    if (!fs.pathExistsSync(configPath)) {
        return config;
    }

    const customConfig = require(configPath).webpack;
    if (typeof customConfig !== 'function') {
        return config;
    }

    return customConfig(config, params);
};

module.exports = ({ isDev }) => {
    const cleanOptions = {
        verbose: true,
        allowExternal: true,
        dry: isDev,
    };
    const output = resolveAppPath('src/htdocs/dist');
    const baseConfig = {
        mode: isDev ? 'development' : 'production',
        watch: isDev,
        context: resolveAppPath('frontend'),
        entry: './index',
        output: {
            filename: 'main.js',
            path: output,
            libraryTarget: 'amd',
        },
        devtool: isDev ? 'cheap-module-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        cacheDirectory: true,
                        ...createBabelConfig(),
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(output, cleanOptions),
        ],
        externals: {
            'plesk-ui-library': 'plesk-ui-library',
        },
    };

    return loadCustomConfig(baseConfig, { isDev });
};
