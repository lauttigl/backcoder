import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

const productManager= new ProductManager()




router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find()
    res.send({status:"success", payload: products})
  } catch (error){
    console.log(error)
  }
})
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).send({ status: "error", error: "product not found" });
    }
    return res.send({ status: "success", payload: product });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "server error" });
  }
});
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