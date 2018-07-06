// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const fs = require('fs-extra');
const path = require('path');
const appPath = process.cwd();
const resolveAppPath = relativePath => path.resolve(appPath, relativePath);

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
    const baseConfig = {
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
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        presets: ['env'],
                        plugins: [
                            require.resolve('babel-plugin-transform-class-properties'),
                            [
                                require.resolve('babel-plugin-transform-react-jsx'),
                                {
                                    pragma: 'createElement',
                                },
                            ],
                        ],
                    },
                },
            ],
        },
        externals: {
            'plesk-ui-library': 'plesk-ui-library',
        },
    };

    return loadCustomConfig(baseConfig, { isDev });
};
