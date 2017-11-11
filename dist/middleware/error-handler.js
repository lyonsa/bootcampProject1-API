'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ($err, req, res, next) => {
	// get boom error
	// convert to error 500 if not boom error
	const err = $err.isBoom ? $err : (0, _boom.badImplementation)('Something broke ):');
	var _err$output$payload = err.output.payload;
	const message = _err$output$payload.message,
	      statusCode = _err$output$payload.statusCode,
	      error = _err$output$payload.error;
	// log error

	console.error(`${error}: ${message}`);
	console.error($err.stack);
	res.status(statusCode).json({
		error,
		message
	});
};
//# sourceMappingURL=error-handler.js.map
