import * as model from '../models/Product.js'

export async function getAllProducts(){
    const resultado = await model.getAllProducts();

    if (resultado.error){ // esto me va a fallar
        return {error: "error en la conexión a la base de datos", status: 500} // a ver que me tira
    }

    if (resultado.empty){
        return {error: "no hay productos cargados", status : 404 }
    }

    return resultado;
}

export async function filtrar(nombre, categoria, precio){
    if(!nombre && !categoria && !precio){
        return {error:'debe ingresar datos validos para realizar la búsqueda', status:400}
    } else {
        let resultado;
        if(nombre){
            resultado = await model.filtrar(nombre, "nombre")
        }
        if(categoria){
            resultado = await model.filtrar(categoria, "categoria")
        }
        if(precio){
            resultado = await model.filtrar(parseInt(precio), "precio")
        }

        console.log("resultado: "  + resultado)
        if(resultado == 0){
            return {error: "No se encontraron productos con ese filtro", status: 404}
        } else {
            return resultado
        }
        
    }
}

export async function crearProducto(nombre, categoria, precio, stock){
    if(!nombre || !categoria || !precio || !stock){
        return {error: "faltan datos necesarios para crear un producto", status: 400}
    }
    if (typeof nombre != "string") return {error: "el nombre del producto debe ser una cadena", status: 400}
    if (typeof categoria != "string") return {error: "el nombre de la categoria debe ser una cadena", status: 400}
    if (typeof precio != "number") return {error: "el precio debe ser un numero", status: 400}
    if (typeof stock != "number") return {error: "el stock debe ser un numero", status: 400}

    
   
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
