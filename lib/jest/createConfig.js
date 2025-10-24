// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

const path = require('path');
const fs = require('fs-extra');
const { resolveAppPath } = require('../utils');

module.exports = () => {
    const setupTestsFile = fs.existsSync(resolveAppPath('src/frontend/setupTests.js'))
        ? '<rootDir>/src/frontend/setupTests.js'
        : undefined;

    return {
        testEnvironment: 'jsdom',
        setupFilesAfterEnv: [setupTestsFile].filter(Boolean),
        testMatch: [
            '**/*.test.js?(x)',
        ],
        transform: {
            '^.+\\.(js|jsx|mjs)$': path.resolve(__dirname, './babelTransform'),
        },
        transformIgnorePatterns: [
            'node_modules/(?!(@plesk/plesk-ext-sdk)/)',
        ],
        snapshotSerializers: [
            'enzyme-to-json/serializer',
        ],
        moduleNameMapper: {
            '\\.(css|less|scss)$': path.resolve(__dirname, './styleMock.js'),
            '\\.(png|jpg|gif|svg|woff|woff2|webp)$': path.resolve(__dirname, './fileMock.js'),
        },
    };
};
