import { Router } from "express";
import ProductManager from "../dao/dbmanagers/products.js";


const router = Router()
const productManager = new ProductManager


router.get("/",  async (req, res) => {
  const products = await productManager.getProducts()
  res.render("home", {products, style: "styles.css", title :"Products"})
})


//     fs.readFile("products.json", (err, data) => {
//       if (err) throw err;
//       const products = JSON.parse(data);
//       res.render("realtimeproducts", { products });
//     });
//   });
router.get("/realtimeproducts", async (req,res) => {
  const products = await productManager.getProducts()
  res.render("realtimeproducts", {
    products,
    style: "styles.css",
    title: "Real Time Products"
  })
})

  // router.delete("/:id", async (req, res) => {
  //   const id = req.params.id;
  //   await productManager.deleteProduct(id);
  //   res.redirect("/");
  // });
  
  // router.post("/", async (req, res) => {
  //   const product = req.body;
  //   await productManager.addProduct(product);
  //   res.redirect("/");
  // });
  




export default router