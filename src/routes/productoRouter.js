import {Router} from 'express'
import { getAllProducts, filtrar, crearProducto, modificarProducto, productoPrecioMenorA, eliminarProducto, buscarProducto } from '../controllers/productoController.js'
import {auth} from '../middlewares/authMiddleware.js'
 
const productoRouter = Router()

productoRouter.get('/getAllProducts', getAllProducts)
productoRouter.get('/filtrar', filtrar) // queries
productoRouter.get('/filtrar/precioMenorA/:precio', productoPrecioMenorA)
productoRouter.get('/buscarProducto/:nombre', buscarProducto)
productoRouter.post('/crearProducto', auth, crearProducto)
productoRouter.put('/modificarProducto/:nombre', auth, modificarProducto)
productoRouter.delete('/eliminarProducto/:nombre', auth, eliminarProducto)
export default productoRouter