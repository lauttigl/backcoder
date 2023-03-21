import { Router } from "express";

const router = Router()

router.get("/",(req,res) => {
    res.render("test", {})
})
//verirficar si va el {}

export default router