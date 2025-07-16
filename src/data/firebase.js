// import admin from 'firebase-admin';
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// // import serviceAccount from '../../firebaseKey.json' assert { type: 'json' }; 
// const serviceAccount = JSON.parse(fs.readFileSync('./firebaseKey.json', 'utf8'));




// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const keyPath = path.resolve(__dirname, '../../firebaseKey.json');

// const raw = await fs.readFile(keyPath, 'utf8');
// //const serviceAccount = JSON.parse(raw);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// export default db;


import admin from 'firebase-admin';
import fs from 'fs';              // para readFileSync
import fsp from 'fs/promises';   // para readFile async
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyPath = path.resolve(__dirname, '../../firebaseKey.json');

// Si querés leer de forma síncrona
const rawSync = fs.readFileSync(keyPath, 'utf8');
const serviceAccountSync = JSON.parse(rawSync);

// O si preferís async/await
const rawAsync = await fsp.readFile(keyPath, 'utf8');
const serviceAccountAsync = JSON.parse(rawAsync);

// Inicializá Firebase con una de las dos
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountSync),
  // o credential: admin.credential.cert(serviceAccountAsync),
});

const db = admin.firestore();

export default db;
