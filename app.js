
import express from "express";
import routes from './routes.js'

const app = express();

import cors from "cors";

app.use(cors());
app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(5000, ()=>{
    console.log("Hello World")
})