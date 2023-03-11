import ProductManager from './ProductManager.js'

const express = require("express")

const app = express()
const port = 8080
const productManager = new ProductManager()


app.get("/products", async (req,res) => {
    const limit = req.query.limit;
    let products = await productManager.getProducts()
    if (limit) {
        products = products.slice(0,limit)
    }
    res.send(products)
} )

app.get("/products/:pid", async (req,res) => {
    const id = parseInt(req.params.pid)
    const product = await productManager.getProductById(id)
    res.send(product)
})


app.listen(port,() =>{
    console.log("servidor levantado en el puerto 8080")
})