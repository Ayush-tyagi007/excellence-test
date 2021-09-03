function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: true
    });
}

exports.responseFlags = {};
exports.responseMessages = {};

//FOR MESSAGES 
define(exports.responseMessages, 'PARAMETER_MISSING', 'Some parameter missing.');
define(exports.responseMessages, 'INVALID_DATA', 'Invalid data.');
define(exports.responseMessages, 'ACTION_COMPLETE', 'Action complete.');
define(exports.responseMessages, 'ERROR_IN_EXECUTION', 'Error in execution.');
define(exports.responseMessages, 'USER_NOT_FOUND', 'User not found.');
define(exports.responseMessages, 'NO_DATA_FOUND', 'No data found.');

//FOR FLAGS
define(exports.responseFlags, 'PARAMETER_MISSING', 422);
define(exports.responseFlags, 'INVALID_DATA', 403);
define(exports.responseFlags, 'ACTION_COMPLETE', 200);
define(exports.responseFlags, 'ERROR_IN_EXECUTION', 404);
define(exports.responseFlags, 'USER_NOT_FOUND', 203);
define(exports.responseFlags, 'NO_DATA_FOUND', 203);