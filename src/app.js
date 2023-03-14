
import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)
app.use("/api/carts/", cartRoutes)

app.listen(8080, (req, res) => {
    console.log("Listening on port 8080")
})

