// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const fs = require('fs-extra');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const { resolveAppPath } = require('../utils');
const resolveLibPath = relativePath => path.resolve(__dirname, '..', relativePath);
const createBabelConfig = require('../babel/createConfig');
const { prepareRoutes, generateRoutesModule } = require('../routes');

const loadExtensionConfig = () => {
    const configPath = resolveAppPath('extension.config.js');
    const defaults = {
        routes: [],
    };

    if (fs.pathExistsSync(configPath)) {
        return {
            ...defaults,
            ...require(configPath),
        };
    }

    return defaults;
};

const applyCustomConfig = (config, params, customConfig) => {
    if (typeof customConfig !== 'function') {
        return config;
    }

    return customConfig(config, params);
};


module.exports = ({ isDev }) => {
    const cleanOptions = {
        verbose: true,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: isDev,
    };
    const output = resolveAppPath('src/htdocs/dist');
    const extensionConfig = loadExtensionConfig();
    const routes = prepareRoutes(extensionConfig.routes);

    const routesPlugin = new VirtualModulesPlugin({
        routes: generateRoutesModule(routes),
    });

    const baseConfig = {
        mode: isDev ? 'development' : 'production',
        watch: isDev,
        context: resolveAppPath('src/frontend'),
        entry: resolveLibPath('templates/index'),
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
                    include: [
                        resolveAppPath('src/frontend'),
                        resolveLibPath('..'),
                    ],
                    loader: require.resolve('babel-loader'),
                    options: {
                        cacheDirectory: true,
                        ...createBabelConfig(),
                    },
                },
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(cleanOptions),
            new HtmlWebpackPlugin({
                filename: resolveAppPath('src/htdocs/index.php'),
                template: resolveLibPath('templates/index.pug'),
                inject: false,
                minify: false,
                templateParameters: {
                    routes,
                },
            }),
        ],
        resolve: {
            modules: [
                resolveAppPath('src/frontend'),
                'node_modules',
            ],
            alias: {
                react: 'react-compat',
            },
        },
        externals: {
            '@plesk/ui-library': { amd: 'plesk-ui-library' },
        },
    };

    const config = applyCustomConfig(baseConfig, { isDev }, extensionConfig.webpack);

    if (!config.plugins || !config.plugins.find(plugin => plugin?.constructor?.name === 'VirtualModulesPlugin')) {
        config.plugins = config.plugins ?? [];
        config.plugins.push(routesPlugin);
    }

    return config;
};
