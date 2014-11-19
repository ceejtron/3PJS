var _ = require('underscore');
var logs = AppEnvironment.logs = {
    debug : [],
    warn : [],
    error : []
};
var logFunc = typeof console === 'undefined' || typeof console.log !== 'function' ? window.alert : _(console.log).bind(console);

AppEnvironment.printLogs = function printLogs (level) {
    level = level || 'debug';
    var levels = _(logs).keys();
    var startLevel = _(levels).indexOf(level);

    if (startLevel === -1) {
        logFunc(level + ' is not a valid log level');
        return;
    }

    for (var i = startLevel; i < levels.length; i++) {
        if (logs[levels[i]].length) {
            printMessages(logs[levels[i]], levels[i]);
        }
    }
};

AppEnvironment.resetLogs = function resetLogs () {
    _(_(logs).keys()).each(function (logLevel) {
        logs[logLevel] = [];
    });
};

function printMessages (msgArray, levelName) {
    var output = '';
    output += levelName + ' logs:\n';
    _(msgArray).each(function (msg) {
        output += msg + '\n';
    });
    logFunc(output);
}

module.exports = {
    log : function log (message, level) {
        level = level || 'debug';
        if (!logs[level]) {
            throw Error('Invalid log level ' + level + ' specified');
        }
        if (AppEnvironment.debug) {
            if (AppEnvironment.storeLogs) {
                // Don't allow storage to exceed 100 messages per level.
                logs[level] = logs[level].length >= 100 ? [] : logs[level];
                logs[level].push(message);
            }
            else {
                logFunc(level + ' log: ' + message);
            }
        }
    },
    warn : function warn (message) {
        this.log(message, 'warn');
    },
    error : function error (message) {
        this.log(message, 'error');
    }
};
