import db from '../data/firebase.js'

export async function getAllProducts(){
    try{
        const snapshot = await db.collection("productos").get();
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productos;
    } catch(error){
        console.error (error ) // arreglar
        return error;
    }
}