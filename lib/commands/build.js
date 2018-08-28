// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const createConfig = require('../webpack/createConfig');
const build = require('../webpack/build');

module.exports = {
    command: 'build',
    desc: 'Build the project.',
    builder: {},
    handler: () => {
        process.env.BABEL_ENV = 'production';
        process.env.NODE_ENV = 'production';

        build(createConfig({
            isDev: false,
        }), (err, stats) => {
            if (err || stats.hasErrors()) {
                process.exit(1);
            }
        });
    },
};
