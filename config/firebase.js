import admin from 'firebase-admin'

import { QueueObserver } from '../firebase/observers'

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
	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	projectId: process.env.FIREBASE_PROJECT_ID,
	databaseURL: process.env.FIREBASE_DB_URL,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

const db = admin.database()
const ref = db.ref('.info/connected')

// register observers
export const queueObserver = new QueueObserver(db)

export default admin
