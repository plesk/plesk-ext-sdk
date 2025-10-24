// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

const pleskConfig = require('@plesk/eslint-config');

module.exports = [
    pleskConfig,
    {
        settings: {
            react: {
                pragma: "createElement",
            },
        },
        rules: {
            'jest/no-test-return-statement': 'off',
            'react/require-default-props': 'off',
        }
    },
];
