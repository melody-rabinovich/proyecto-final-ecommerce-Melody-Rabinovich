import * as model from '../models/Product.js'

export async function getAllProducts(){
    const resultado = await model.getAllProducts();

    if (resultado.error){ 
        return {error: "error en la conexión a la base de datos", status: 500} 
    }

    if (resultado.empty){
        return {error: "no hay productos cargados", status : 404 }
    }

    return resultado;
}

export async function filtrar(nombre, categoria){
    if(!nombre && !categoria){
        return {error:'debe ingresar datos validos para realizar la búsqueda', status:400}
    } else {
        let resultado;
        if(nombre){
            resultado = await model.filtrar(nombre, "nombre")
        }
        if(categoria){
            resultado = await model.filtrar(categoria, "categoria")
        }

        if(resultado.length == 0){
            return {error: "No se encontraron productos con ese filtro", status: 404}
        } else {
            return resultado
        }
        
    }
}

export async function productoPrecioMenorA (precio){
    if(!precio || typeof parseInt(precio) == NaN ){
        return {error: "se requiere un precio y debe ser un número", status : 401 }
    } else{
        const resultado = await model.productosPrecioMenorA(parseInt(precio))

        if( resultado.length == 0){ 
            return {error: "No se encontraron productos con ese filtro", status: 404}
        } else if(resultado.error) {
            return {error: resultado.error, status: 500}
        } else {
            return resultado
        }
    }
    
}

export async function buscarProducto (nombre){
    if(!nombre){
        return {error: "debe ingresar un nombre para realizar la búsqueda", status: 400}
    } else {
        const resultado = await model.buscarProducto(nombre);
        if (resultado == null){
            return {error: "no se encontró un producto con ese nombre", status:404}
        } else {
            return resultado
        }
    }
}

export async function crearProducto(nombre, categoria, precio, stock){
    const validacion = validarDatos(nombre, categoria, precio, stock)
    if (validacion !== "OK"){
        return validacion
    }

    
    const encontrado = await model.buscarProducto(nombre)
    if(encontrado != null){
        return {error: "producto ya existente", status: 400}
    } else{
        const resultado = await model.crearProducto(nombre, categoria, precio, stock);
        if (resultado.error){
            return { error: resultado.error, status: 500}
        } else {
            return resultado
        }
    }

}

export async function modificarProducto(nombre, categoria, precio, stock){
    const validacion = validarDatos(nombre, categoria, precio, stock)
    if (validacion !== "OK"){
        return validacion
    } else {
        const resultado = await model.modificarProducto(nombre, categoria, precio, stock)
        if (resultado.error){
            return { error: resultado.error, status: 400}
        } else {
            return resultado
        }
    }
}

export async function eliminarProducto(nombre){
    if (!nombre){
        return {error: "se debe ingresar un nombre", status: 401}
    } 

    const producto = await model.buscarProducto(nombre);
    if (producto == null){ 
        return {error: "producto no encontrado", status: 404}
    } else {
        const resultado = await model.eliminarProducto(producto.id)
        if( resultado.error) {
            return {error: resultado.error, status: resultado.status}
        } else {
            return {message: resultado.message, status: resultado.status}
        }
         
    }
}

// Funciones de uso interno
function validarDatos(nombre, categoria, precio, stock){
    if(!nombre || !categoria || !precio || !stock){
        return {error: "faltan datos necesarios para el producto", status: 400}
    }
    if (typeof nombre != "string") return {error: "el nombre del producto debe ser una cadena", status: 400}
    if (typeof categoria != "string") return {error: "el nombre de la categoria debe ser una cadena", status: 400}
    if (typeof precio != "number") return {error: "el precio debe ser un numero", status: 400}
    if (typeof stock != "number") return {error: "el stock debe ser un numero", status: 400}

    return "OK"
}