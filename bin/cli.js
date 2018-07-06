#!/usr/bin/env node

process.on('unhandledRejection', err => {
    throw err;
});

require('yargs')
    .commandDir('../lib/commands')
    .demandCommand(1)
    .help()
    .parse();
