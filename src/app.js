import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import viewsRoutes from "./routes/views.routes.js"
import socket from "./socket.js";
import mongoose from "mongoose";
import morgan from "morgan";
import sessionsRouter from "./routes/sessions.router.js"
import session from "express-session";
import MongoStore from "connect-mongo";

//inicializacion
const app = express();

//viewengine
app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

//middlewares
app.use("/", viewsRoutes)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)
app.use("/api/carts/", cartRoutes)
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"))
app.use("/api/sessions", sessionsRouter)
app.use(session({
    store: MongoStore.create({
        mongoUrl : config.dbUrl,//falta crear el config
        ttl: 20,
    }),
    resave: false,
    saveUninitialized: true,
    secret: "testsecret",
}))

const httpServer= app.listen(8080, () => {
    console.log("Listening on port 8080")
})

//database connection
mongoose.connect ("mongodb+srv://ljiglesias:doremi123@clusterlautaro.h8vzm81.mongodb.net/?retryWrites=true&w=majority")

socket.connect(httpServer)




