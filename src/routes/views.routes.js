import { Router } from "express";
import fs from "fs"
import ProductManager from "../dao/ProductManager.js";


const router = Router()
const productManager = new ProductManager
const products = await productManager.getProducts()

router.get("/", (req, res) => {
    fs.readFile("products.json", (err, data) => {
      if (err) throw err;
      const products = JSON.parse(data);
      res.render("home", { products });
    });
  });

// router.get("/realtimeproducts", (req, res) => {
//     fs.readFile("products.json", (err, data) => {
//       if (err) throw err;
//       const products = JSON.parse(data);
//       res.render("realtimeproducts", { products });
//     });
//   });
router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {
    products,
    title: "Real Time Products",
  });
});

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await productManager.deleteProduct(id);
    res.redirect("/");
  });
  
  router.post("/", async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product);
    res.redirect("/");
  });
  




export default router