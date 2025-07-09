import {Router} from 'express'
import { getAllProducts } from '../controllers/productoController.js'

const productoRouter = Router()

productoRouter.get('/getAllProducts', getAllProducts)

export default productoRouter