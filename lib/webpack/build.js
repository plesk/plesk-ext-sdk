// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

/* eslint-disable no-console */
const webpack = require('webpack');

module.exports = (conf, callback) => {
    const { watch, ...config } = conf;
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
            console.log('Compiled successfully!');
        }

        if (messages.errors.length) {
            console.error('Failed to compile.\n');
            console.error(messages.errors[0]);
            callback(err, stats);
            return;
        }

        if (messages.warnings.length) {
            console.warn('Compiled with warnings.\n');
            console.warn(messages.warnings.map(warning => warning.message || warning).join('\n\n'));
        }

        callback(err, stats);
    };

    if (watch) {
        compiler.watch({}, compilerCallback);
    } else {
        compiler.run(compilerCallback);
    }
};
