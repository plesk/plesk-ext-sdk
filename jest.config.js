// Copyright 1999-2025. WebPros International GmbH. All rights reserved.


/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom",
    testMatch: [
        '**/*.test.js?(x)',
    ],
    setupFiles: [
        '<rootDir>/test/shim.js',
        '<rootDir>/test/setup.js',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(png|jpg|gif|svg|woff|woff2)$": "<rootDir>/test/fileMock.js",
        "\\.(css|less)$": "<rootDir>/test/styleMock.js"
    },
     moduleDirectories: [
        "src",
        "node_modules"
    ],
};

module.exports = config;
