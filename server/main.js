import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'

const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(cookieParser())

app.use(express.json())
app.use('/api', authRoutes)


app.listen(8000, () => {
    console.log('Conectado na porta 8000')
}) 