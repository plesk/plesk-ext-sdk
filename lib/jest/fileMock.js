// Copyright 1999-2025. WebPros International GmbH. All rights reserved.
const path = require('path');

module.exports = {
    process(sourceText, sourcePath) {
        return {
            code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
        };
    },
};
