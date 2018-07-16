// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const path = require('path');
const appPath = process.cwd();

module.exports.resolveAppPath = relativePath => path.resolve(appPath, relativePath);
