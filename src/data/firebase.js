import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// import serviceAccount from '../../firebaseKey.json' assert { type: 'json' }; 
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync('./firebaseKey.json', 'utf8'));


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const keyPath = path.resolve(__dirname, '../../firebaseKey.json');

const raw = await fs.readFile(keyPath, 'utf8');
//const serviceAccount = JSON.parse(raw);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
