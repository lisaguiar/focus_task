import express from 'express'

import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json())
app.use('/api', authRoutes)


app.listen(8000, () => {
    console.log('Conectado na porta 8000')
}) 