import { Server } from "socket.io";
import ProductManager from "./dao/dbmanagers/products.js";

const socket = {}

socket.connect = function(httpServer) {
    socket.io = new Server(httpServer);
    const productManager = new ProductManager()


    socket.io.on("connection", async (socket) => {
        console.log(`${socket.id} connected`)
        const products = await productManager.getProducts()

        socket.on('upload', async (file) => {
            file.forEach((e) => {
                writeFileSync(path.join(__dirname, `./public/img/${e.name}`), e.data)
            })
        })
        socket.emit(`products`, products)
        socket.on('addProduct', async (newProd) => {
            const product = await productManager.addProduct(newProd)
            socket.emit('newProduct', product)
        })
        
    })

}

export default socket


    
