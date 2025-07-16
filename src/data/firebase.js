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
import fs from 'fs/promises'; // usamos la versión async
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalente en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo
const keyPath = path.resolve(__dirname, '../../firebaseKey.json');

// Leer el archivo JSON de forma asíncrona
const raw = await fs.readFile(keyPath, 'utf8');
const serviceAccount = JSON.parse(raw);

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exportar instancia de Firestore
const db = admin.firestore();

export default db;
