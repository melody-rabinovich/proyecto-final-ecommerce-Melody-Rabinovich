import {Router} from 'express'
import { getAllProducts, filtrar, crearProducto } from '../controllers/productoController.js'
import {auth} from '../middlewares/authMiddleware.js'
 
const productoRouter = Router()

productoRouter.get('/getAllProducts', getAllProducts)
productoRouter.get('/filtrar', filtrar) // queries
productoRouter.post('/crearProducto', auth, crearProducto)
//productoRouter.put('/modificarProducto/:id', auth, modificarProducto)
//productoRouter.delete('/eliminarProducto/:id', auth, eliminarProducto)
//productoRouter.get('/comprarProducto/:nombre/:cant, comprarProducto) // resta la cantidad del stock y devuelve el producto con un mensaje
export default productoRouter