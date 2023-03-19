import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import handlebars from "express-handlebars"
import { getDirname } from "./utils.js"
import viewsRoutes from "./routes/views.routes.js"
import path from "path"
import { Server } from "socket.io";



const __dirname = path.resolve();

const publicPath = path.resolve(__dirname, './public');

const app = express();

app.engine("handlebars", handlebars.engine())
app.set("views", `${getDirname()}/views`)
app.set("view engine", "handlebars")
app.set("views", path.resolve(getDirname(), "views"))
app.use("/", viewsRoutes)


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)
app.use("/api/carts/", cartRoutes)
app.use(express.static(publicPath));


const httpServer= app.listen(8080, () => {
    console.log("Listening on port 8080")
})

const socketServer = new Server(httpServer)


socketServer.on("connection", (socket) => {
    console.log("nuevo cliente conectado")

    socket.on("message", (data) => {
        console.log(data)
    })
})



