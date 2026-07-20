// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

module.exports = () => ({
    babelrc: false,
    presets: [
        require.resolve('@babel/preset-env'),
        require.resolve('@babel/preset-react'),
    ],
    plugins: [
        require.resolve('@babel/plugin-transform-class-properties'),
        [
            require.resolve('@babel/plugin-transform-react-jsx'),
            {
                runtime: 'classic',
                pragma: 'createElement',
            },
        ],
    ],
});
