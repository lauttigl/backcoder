import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

const productManager= new ProductManager




router.post("/", async (req, res) => {
  //ESTE CODIGO FUNCIONABA SIN MONGOOSE
    // let product = req.body

    // if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
    //     return res
    //     .status(400)
    //     .send({status: "error", error: "incomplete values"})
    // }
    // const result = await productManager.addProduct(product)
      // return res.status(201).send({status: "success", message: "product added"});
    try {
      const {title,description,price,code,stock,category} = req.body
      if (!title || !description || !price || !code || !stock || !category)
      return res
      .status(400)
      .send ({status:"error", error: "missing properties"})

      const producto = {
        title,
        description,
        code,
        price,
        stock,
        category,
      }
      const productCreated = await productModel.create(producto)
    return res.send({status:"success", payload: productCreated})
    } catch (error) {
      console.log(error)
    }
   
    
  
 
   
});

// router.get("/", async (req,res) =>{
//     const products = await productManager.getProducts()
//     if(products.length ===0){
//         return res
//             .status(404)
//             .send({status:"error", message: "there are not products registred"})
//     }
//     return res.status(200).send({status:"OK", message: products})
// });

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find()
    res.send({status:"success", payload: products})
  } catch (error){
    console.log(error)
  }
})

router.put("/:pid", async (req, res) => {
  try {
    const {pid} = req.params
    const updatedProduct = req.body

    if (!updatedProduct) {
      return res.status(400).send({status:"error", error: "missing information"})
    }

    const productModify = await productModel.updateOne({_id: pid}, updatedProduct)
    return res.send({status:"success", payload: productModify})
  } catch(error){
    console.log(error)
  }
})

  router.delete("/:pid", async (req, res) => {
    const {pid} =req.params

    const product = await productModel.deleteOne({_id: pid})
    return res.send({status:"success", payload: product})
  })

  
export default router