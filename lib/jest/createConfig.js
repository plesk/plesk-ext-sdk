// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const path = require('path');

module.exports = () => {
    return {
        transform: {
            '^.+\\.(js|jsx|mjs)$': path.resolve(__dirname, './babelTransform'),
        },
        moduleNameMapper: {
            'plesk-ui-library': '<rootDir>/node_modules/@plesk/ui-library/dist/plesk-ui-library.js'
        },
    };
};
