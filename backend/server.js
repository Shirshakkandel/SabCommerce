import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()


if (process.env.NODE_ENV === "development") {
     app.use(morgan('dev'))
}

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '/frontend/build')))
     app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname,'frontend','build', 'index.html'))
     })
} else {
     app.use('/', (req, res) => { res.send("Api is working") })
}

app.use(express.json())

app.use('/api/users', userRoutes)



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in 5000`))

