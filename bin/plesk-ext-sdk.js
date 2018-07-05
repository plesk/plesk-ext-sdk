#!/usr/bin/env node

process.on('unhandledRejection', err => {
    throw err;
});

require('yargs')
    .commandDir('../commands')
    .demandCommand(1)
    .help()
    .parse();
