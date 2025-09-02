// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import js from '@eslint/js';
import pleskConfig from '@plesk/eslint-config';

export default [
    js.configs.recommended,
    pleskConfig,
    {
        rules: {
            'jest/no-test-return-statement': 'off',
            'no-console': 'off',
        },
        settings: {
            react: {
                pragma: 'createElement',
            },
        },
    },
];
