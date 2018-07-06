// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const createConfig = require('../webpack/createConfig');
const build = require('../webpack/build');

module.exports = {
    command: 'dev',
    desc: 'Start building in development mode and watch changes.',
    builder: {},
    handler: () => {
        process.env.BABEL_ENV = 'development';
        process.env.NODE_ENV = 'development';

        build(createConfig({
            isDev: true,
        }), err => {
            if (err) {
                process.exit(1);
            }
        });
    },
};
