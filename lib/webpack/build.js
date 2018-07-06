// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

const webpack = require('webpack');
const chalk = require('chalk');

module.exports = (config, callback) => {
    const compiler = webpack(config);
    const compilerCallback = (err, stats) => {
        if (err) {
            console.error(`Error running command: ${err.message}`);
            if (err.stack) {
                console.error(err.stack);
            }
            callback(err, stats);
            return;
        }

        const messages = stats.toJson({}, true);
        const isSuccessful = !messages.errors.length && !messages.warnings.length;

        if (isSuccessful) {
            console.log(chalk.green('Compiled successfully!'));
        }

        if (messages.errors.length) {
            console.log(chalk.red('Failed to compile.\n'));
            console.log(messages.errors[0]);
            callback(err, stats);
            return;
        }

        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'));
            console.log(messages.warnings.join('\n\n'));
        }

        callback(err, stats);
    };

    if (config.watch) {
        compiler.watch({}, compilerCallback);
    } else {
        compiler.run(compilerCallback);
    }
};
