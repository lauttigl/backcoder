import { Router } from "express";
import userModel from "../dao/models/user.models.js";
import { isValidPassword, createHash } from "../utils.js";
import passport from "passport";



const router = Router()

router.post("/login", passport.authenticate("login",{failureRedirect:"/failLogin"}),  async (req, res) => {

   req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
   }
   return res.send({status:"success", payload: req.user})
})
router.get("/failLogin", (req,res) => {
    res.send({status:"error", error:"authentication error"})
})

router.post("/register", passport.authenticate("register",{failureRedirect:"/failRegister"}), async (req, res) => {
 return res.send({status:"success", message:"user registered"})
})
router.get("/failRegister", (req,res) => {
    return res.send({status:"status", error: "authentication error"})
})

router.get("/github", passport.authenticate("githublogin", {scope:["user:email"]}),(req,res) => {})

router.get("/githubcallback", passport.authenticate("githlogin", {failureRedirect:"/login"}), (req,res) => {
    req.session.user = req.user
    res.redirect("/")
})

export default router