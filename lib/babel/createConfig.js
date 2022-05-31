// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

module.exports = () => ({
    babelrc: false,
    presets: [
        require.resolve('@babel/preset-env'),
        [
            require.resolve('@babel/preset-react'),
            {
                runtime: 'automatic',
            },
        ],
    ],
    plugins: [
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        [
            require.resolve('@babel/plugin-transform-react-jsx'),
            {
                pragma: 'createElement',
            },
        ],
    ],
});
