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

export async function filtrar(filtro, nombreFiltro){
    
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

export async function buscarProducto(nombreBuscado){
    try{
        const snapshot = await db.collection("productos").where("nombre", "==", nombreBuscado).get();
        if(snapshot.empty){
            return {error: `no se encontró ningun producto con el nombre ${nombreBuscado}`, status: 404}
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };

    } catch (error){
        console.error(error);
        return error
    }
}

export async function crearProducto(nombre, categoria, precio, stock){
    try{
        const nuevoProducto = {
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            stock: stock
        }
        await db.collection("productos").add(nuevoProducto);
        return {message: productoAgregado, nuevoProducto}
    } catch (error){
        console.error(error);
        return error
    }
    
}