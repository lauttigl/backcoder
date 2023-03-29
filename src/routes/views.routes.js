import { Router } from "express";
import fs from "fs"


const router = Router()

router.get("/", (req, res) => {
    fs.readFile("products.json", (err, data) => {
      if (err) throw err;
      const products = JSON.parse(data);
      res.render("home", { products });
    });
  });
router.get("/realtimeproducts", (req, res) => {
    fs.readFile("realtimeproducts", (err, data) => {
      if (err) throw err;
      const products = JSON.parse(data);
      res.render("home", { products });
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