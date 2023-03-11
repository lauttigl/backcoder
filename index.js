import ProductManager from "./src/ProductManager.js";

const manager = new ProductManager();

const env = async ( ) => {
   let primeraConsulta = await manager.consultProduct()
   console.log(primeraConsulta)
    const product ={
        title: "tv samsung",
        description: "tv samsung",
        price: 20000,
        thumbnail: "foto",
        code: "123",
        stock: 5,

    }


    //CODIGO COMENTADO PARA QUE DEJE DE AGREGAR PRODUCTOS CONSTANTEMENTE
    
    // let result = await manager.addProduct(product)
    // console.log(result)

    // let segundaConsulta = await manager.consultProduct()
    // console.log(segundaConsulta)

    // let terceraConsulta = await manager.getProducts()
    // console.log(terceraConsulta)

    // let consultaId = await manager.getProductById(2)
    // console.log(consultaId)

    // let productosActualizados = await manager.updateProduct(2, {title:"Nuevo Producto"})
    // console.log(productosActualizados)

//     let productosEliminados = await manager.deleteProduct(6)
//   console.log(productosEliminados)
  
}

env()