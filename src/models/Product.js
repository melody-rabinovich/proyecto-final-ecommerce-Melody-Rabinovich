// import db from '../data/firebase.js' // !
import db from './firebase.js' // !
import { collection, query, where, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore'; // !

const productsCollection = collection(db, "productos") // !
export async function getAllProducts(){
    try{
        const snapshot = await getDocs(productsCollection) // !
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productos;
    } catch(error){
        console.error (error) 
        return error;
    }
}

export async function filtrar(filtro, nombreFiltro){
    
    try{
        const snapshot = await getDocs(productsCollection) // !
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
        const q = query(productsCollection, where("precio", "<=", precio)); // !
        const snapshot = await getDocs(q);// !
        //const snapshot = await getDocs(productsCollection).where("precio", "<=", precio).get()
        
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
       // const snapshot = await db.collection("productos").where("nombre", "==", nombreBuscado).get();
       const q = query(productsCollection, where("nombre", "==", nombreBuscado));
       const snapshot = await getDocs(q)

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
        //await db.collection("productos").add(nuevoProducto);
        const docRef = await addDoc(productsCollection, nuevoProducto); //!
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
            const docRef = doc(productsCollection, id); // !
            await updateDoc(docRef, {
                categoria,
                precio,
                stock
            });
            /**await db.collection('productos').doc(id).update({
                categoria,
                precio,
                stock
            });*/
            
            //const docActualizado = await db.collection('productos').doc(id).get(); 
            const docActualizado = await getDoc(docRef); //!

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

export async function eliminarProducto(id){
    try {
        //await db.collection('productos').doc(id).delete();
        await deleteDoc(doc(productsCollection, id)) // !
        return { message: "Producto eliminado correctamente", status : 200 };
    } catch (error) {
        console.error(error);
        return { error: "Error al eliminar producto" };
    }
}