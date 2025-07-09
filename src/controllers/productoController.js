import * as service from '../services/productoService.js'

export const getAllProducts = async (req, res) =>{
    const resultado = await service.getAllProducts();

    if (resultado.error){
        res.status(resultado.status).json({error: resultado.error})
    } else {
        res.status(200).json(resultado)
    }
}