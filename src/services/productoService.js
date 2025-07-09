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