import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'colors'

import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import {connectDB} from './config/mongoDB.js'
import userRoutes from './routes/userRoutes.js'
import itemRoutes from './routes/itemRoutes.js'

dotenv.config()
const port = process.env.PORT || 7000

// MongoDB Connection
connectDB()

// Init express app
const app = express()

// cross origin requests
app.use(cors())

// cookie parser
app.use(cookieParser())

// request body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/items', itemRoutes)

// Error Middleware
app.use(notFound)
app.use(errorHandler)

// The code snippet below kills the server when => CTRL + C
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});

app.listen(port, () => console.log(`Listen to port: ${port}`.underline.bold))