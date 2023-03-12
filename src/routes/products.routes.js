import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager= new ProductManager




router.post("/", async (req, res) => {
    let product = req.body

    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
        return res
        .status(400)
        .send({status: "error", error: "incomplete values"})
    }
    const result = await productManager.addProduct(product)
    
    return res.status(201).send({status: "success", message: "product added"});
});

router.get("/", async (req,res) =>{
    const products = await productManager.getProducts()
    if(products.length ===0){
        return res
            .status(404)
            .send({status:"error", message: "there are not products registred"})
    }
    return res.status(200).send({status:"OK", message: products})
});

router.put("/:id", async (req, res) => {
    const productId = req.params.id
    const changes = req.body;
  
    const updatedProducts = await productManager.updateProduct(productId, changes);
    
    console.log(productId)
    
    console.log(changes)
  
    if (updatedProducts) {
      return res
        .status(200)
        .send({ status: "OK", message: "Product successfully updated" });
    } else {
      return res
        .status(404)
        .send({ status: "error", message: "Product not found" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
  
    const updatedProducts = await productManager.deleteProduct(productId);
  
    if (updatedProducts) {
      return res
        .status(200)
        .send({ status: "success", message: "Product successfully deleted" });
    } else {
      return res
        .status(404)
        .send({ status: "error", message: "Product not found" });
    }
  })
export default router