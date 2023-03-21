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





export default router