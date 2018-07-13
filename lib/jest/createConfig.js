// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const path = require('path');
const fs = require('fs-extra');
const { resolveAppPath } = require('../utils');

module.exports = () => {
    const setupTestsFile = fs.existsSync(resolveAppPath('src/frontend/setupTests.js'))
        ? '<rootDir>/src/frontend/setupTests.js'
        : undefined;

    return {
        setupTestFrameworkScriptFile: setupTestsFile,
        transform: {
            '^.+\\.(js|jsx|mjs)$': path.resolve(__dirname, './babelTransform'),
        },
        moduleNameMapper: {
            'plesk-ui-library': '<rootDir>/node_modules/@plesk/ui-library/dist/plesk-ui-library.js'
        },
    };
};
