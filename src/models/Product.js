import db from '../data/firebase.js'

export async function getAllProducts(){
    try{
        const snapshot = await db.collection("productos").get();
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productos;
    } catch(error){
        console.error (error) // arreglar
        return error;
    }
}

export async function buscar(filtro, nombreFiltro){
    
    try{
        // const query = db.collection('productos').where(nombreFiltro, '==', filtro);
        
        let query;
        if (nombreFiltro == "precio"){
            query = db.collection('productos').where(nombreFiltro, '<=', filtro);
        } else{
            query = db.collection('productos').where(nombreFiltro, '==', filtro);
        }

        const snapshot = await query.get();
        const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return productos;
          
    } catch (error){
        console.error(error);
        return error
    }
}