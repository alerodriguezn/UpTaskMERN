import express from "express"
import conectarDB from "./config/db.js"
import dotenv from 'dotenv'
import cors from "cors"
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express()

app.use(express.json())

dotenv.config()

conectarDB()

//CORS

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true) // No hay error, pero se le duvuelve un true
        } else {
            callback(new Error("Error de CORS"))
        }
    }
}
app.use(cors(corsOptions))

// ---- Routing ----

// Usuarios
app.use('/api/usuarios', usuarioRoutes)
// Proyectos
app.use('/api/proyectos', proyectoRoutes)
// Tareas
app.use('/api/tareas', tareaRoutes)


// Puerto
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en el puerto ${PORT}`)
})