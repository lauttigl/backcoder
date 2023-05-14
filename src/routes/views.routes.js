import { Router } from "express";
import ProductManager from "../dao/dbmanagers/products.js";
import { checkLogged, checkLogin, checkSession } from "../middlewares/auth.js";


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

// router.get("/register",(req,res) => {
//   res.render("register")
// })


// router.get("/login", (req,res) => {
//   res.render("login")
// })

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
  


  router.get("/login", checkSession, (req, res) => {
    res.render("login");
  });
  
  // router.get("/register", checkLogged, (req, res) => {
  //   res.render("register");
  // });
  
  // router.get("/restore", (req, res) => {
  //   res.render("restore");
  // });
  
  // router.get("/", checkLogin, (req, res) => {
  //   res.render("profile", { user: req.session.user });
  // });
  


export default router