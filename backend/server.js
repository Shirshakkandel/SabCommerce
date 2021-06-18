import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()


if (process.env.NODE_ENV === "development") {
     app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)


app.use('/', (req, res) => { res.send("Api is working") })
app.use(notFound)
app.use(errorHandler)

app.listen(5000,console.log(`Server is running in 5000`))

