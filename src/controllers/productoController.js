import * as service from '../services/productoService.js'

export const getAllProducts = async (req, res) =>{
    const resultado = await service.getAllProducts();

    if (resultado.error){
        res.status(resultado.status).json({error: resultado.error})
    } else {
        res.status(200).json(resultado)
    }
}

export const filtrar = async (req, res) =>{
    const {nombre, categoria, precio} = req.query;
    const resultado = await service.filtrar(nombre, categoria, precio)

    if(resultado.error){
        res.status(resultado.status).json({error:resultado.error})
    } else {
        res.status(200).json(resultado)
    }
}

export const crearProducto = async (req, res) => {
    const {nombre, categoria, precio, stock} = req.body
    const resultado = await service.crearProducto(nombre, categoria, precio, stock);

    if (resultado.error){
        res.status(resultado.status).json({error: resultado.error});
    } else {
        res.status(201).json({message: "producto creado con exito: ", resultado})
    }
}