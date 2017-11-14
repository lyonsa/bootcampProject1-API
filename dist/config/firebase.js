'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.queueObserver = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _observers = require('../firebase/observers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_X509_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

_firebaseAdmin2.default.initializeApp({
	credential: _firebaseAdmin2.default.credential.cert(serviceAccount),
	projectId: process.env.FIREBASE_PROJECT_ID,
	databaseURL: process.env.FIREBASE_DB_URL,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = _firebaseAdmin2.default.database();
const ref = db.ref('.info/connected');

// register observers
const queueObserver = exports.queueObserver = new _observers.QueueObserver(db);

exports.default = _firebaseAdmin2.default;
//# sourceMappingURL=firebase.js.map
