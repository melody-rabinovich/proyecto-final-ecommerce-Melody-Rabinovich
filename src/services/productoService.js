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

export async function buscar(nombre, categoria, precio){
    if(!nombre && !categoria && !precio){
        return {error:'debe ingresar datos validos para realizar la búsqueda', status:400}
    } else {
        let resultado;
        if(nombre){
            resultado = await model.buscar(nombre, "nombre")
        }
        if(categoria){
            resultado = await model.buscar(categoria, "categoria")
        }
        if(precio){
            resultado = await model.buscar(parseInt(precio), "precio")
        }

        console.log("resultado: "  + resultado)
        if(resultado == 0){
            return {error: "No se encontraron productos con ese filtro", status: 404}
        } else {
            return resultado
        }
        
    }
}