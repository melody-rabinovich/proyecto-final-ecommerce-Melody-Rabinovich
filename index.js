import cors from 'cors'
import express from 'express'
import authRouter from './src/routes/authRouter.js'
import productoRouter from './src/routes/productoRouter.js'
import dotenv from 'dotenv';
dotenv.config();


const PORT = 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
    methods : ['GET', 'POST', 'PUT', 'DELETE'] // ?
}))

app.use(express.json())

app.use(authRouter);
app.use(productoRouter)

app.get('/', (req, res)=>{
    res.json({message:"API Rest en Node js"})
})

app.use((req, res, next) => {
    res.status(404).json({error:'ERROR -- ruta no encontrada'})
})

app.listen(PORT, () => console.log( `escuchando en el servidor http://localhost:${PORT}`))
