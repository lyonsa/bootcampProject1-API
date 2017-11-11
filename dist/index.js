'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _hpp = require('hpp');

var _hpp2 = _interopRequireDefault(_hpp);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _routes = require('./routes');

var routes = _interopRequireWildcard(_routes);

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// initalize express app
const app = (0, _express2.default)();

// mount middleware
app.use((0, _helmet2.default)()).use((0, _hpp2.default)()).use((0, _compression2.default)()).use((0, _morgan2.default)(PROD ? 'combined' : 'dev')).use(_bodyParser2.default.json()).use((0, _cors2.default)());

// disable some headers
app.disable('x-powered-by').disable('etag');

// mount routes
app.use('/game', routes.gameRoute).use(middleware.notFound).use(middleware.errorHandler);

// listen for traffic
app.listen(PORT);

process.on('uncaughtException', err => console.error(err));
//# sourceMappingURL=index.js.map
