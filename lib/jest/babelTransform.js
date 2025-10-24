// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

const babelJest = require('babel-jest');
const createConfig = require('../babel/createConfig');

module.exports = babelJest.createTransformer(
    createConfig(),
);
