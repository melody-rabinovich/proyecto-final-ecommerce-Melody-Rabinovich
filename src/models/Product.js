import db from '../data/firebase.js'

export async function getAllProducts(){
    try{
        const snapshot = await db.collection("productos").get();
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productos;
    } catch(error){
        console.error (error) 
        return error;
    }
}

export async function filtrar(filtro, nombreFiltro){
    
    try{
        const snapshot = await db.collection('productos').get();
        const productos = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p[nombreFiltro].toLowerCase().includes(filtro.toLowerCase()));

        return productos;
          
    } catch (error){
        console.error(error);
        return error
    }
}

export async function productosPrecioMenorA(precio){
    try{
        const snapshot = await db.collection("productos").where("precio", "<=", precio).get()
        
        const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

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
            return null
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
        return {message: "producto agregado", nuevoProducto}
    } catch (error){
        console.error(error);
        return error
    }
    
}

export async function modificarProducto(nombre, categoria, precio, stock){
    try{
        let producto = await buscarProducto(nombre);
        if (producto  == null) {
            return {error: "no se encontró el producto", status:404}
        } else {
            const id = producto.id;
            await db.collection('productos').doc(id).update({
                categoria,
                precio,
                stock
            });
            
            const docActualizado = await db.collection('productos').doc(id).get();

            return {
                message: "producto modificado",
                producto: {
                    id: docActualizado.id,
                    ...docActualizado.data()
                }
            };
        }
    } catch (error){
        console.error(error);
        return error //{error: "error al actualizar el producto", status: 500}
    }
}