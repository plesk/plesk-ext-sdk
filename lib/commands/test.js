// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

// eslint-disable-next-line jest/no-jest-import
const jest = require('jest');
const createConfig = require('../jest/createConfig');

module.exports = {
    command: 'test',
    desc: 'Run tests.',
    builder: {},
    handler: () => {
        const argv = process.argv.slice(3);

        process.env.BABEL_ENV = 'test';
        process.env.NODE_ENV = 'test';

        argv.push(
            '--config',
            JSON.stringify(createConfig()),
        );

        jest.run(argv);
    },
};
