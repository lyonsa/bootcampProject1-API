'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boom = require('boom');

exports.default = (req, res, next) => {
	next((0, _boom.notFound)('The endpoint you requested was not found.'));
};
//# sourceMappingURL=not-found.js.map
