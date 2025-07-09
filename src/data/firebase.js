import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import serviceAccount from '../../firebaseKey.json' assert { type: 'json' }; // o el archivo de clave privada

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const keyPath = path.resolve(__dirname, '../../firebaseKey.json');

const raw = await fs.readFile(keyPath, 'utf8');
//const serviceAccount = JSON.parse(raw);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
