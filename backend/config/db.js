import mongoose from 'mongoose'
const { connect } = mongoose

export default async function connectDB() {
     try {
     const conn = await connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
     console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold)
     } catch (error) {
          console.log(`Error: ${error.message}`.red.underline.bold)
          process.exit(1)
     } }