'use strict';

require('./config/env');

require('./config/firebase');

require('./config/express');

process.on('uncaughtException', err => console.error(err));
//# sourceMappingURL=index.js.map
