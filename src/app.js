import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import viewsRoutes from "./routes/views.routes.js"
import socket from "./socket.js";
import mongoose from "mongoose";


const app = express();

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")
app.use("/", viewsRoutes)


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)
app.use("/api/carts/", cartRoutes)
app.use(express.static(`${__dirname}/public`));


const httpServer= app.listen(8080, () => {
    console.log("Listening on port 8080")
})

mongoose.connect ("mongodb+srv://ljiglesias:doremi123@clusterlautaro.h8vzm81.mongodb.net/?retryWrites=true&w=majority")

socket.connect(httpServer)




