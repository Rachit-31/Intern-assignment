import dotenv from "dotenv"
import app from './app.js'

import connectDB from "./db/connectTomongoDb.js"

dotenv.config({
    path:'./.env'
})

app.get('/',(req, res)=>{
    res.send("Server is running")
})

connectDB()
.then(()=>{
  app.listen( process.env.PORT || 8000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MongoDb connection failed", err)
})