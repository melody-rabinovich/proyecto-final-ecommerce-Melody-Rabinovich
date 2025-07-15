import {Router} from 'express'
import { getAllProducts, filtrar, crearProducto, modificarProducto, productoPrecioMenorA } from '../controllers/productoController.js'
import {auth} from '../middlewares/authMiddleware.js'
 
const productoRouter = Router()

productoRouter.get('/getAllProducts', getAllProducts)
productoRouter.get('/filtrar', filtrar) // queries
productoRouter.get('/filtrar/precioMenorA/:precio', productoPrecioMenorA)
productoRouter.post('/crearProducto', auth, crearProducto)
productoRouter.put('/modificarProducto/:nombre', auth, modificarProducto)
//productoRouter.delete('/eliminarProducto/:id', auth, eliminarProducto)
//productoRouter.put('/comprarProducto/:nombre/:cant, comprarProducto) // busca el nombre del producto, resta la cantidad del stock y devuelve el producto con un mensaje
export default productoRouter