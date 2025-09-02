// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

/** @type {import('jest').Config} */
const config = {
    testMatch: [
        '**/*.test.js?(x)',
    ],
    setupFiles: [
        '<rootDir>/test/setup.js',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
};

module.exports = config;
