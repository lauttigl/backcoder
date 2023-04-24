import { Router } from "express";
import userModel from "../dao/models/user.models.js";

const router = Router()

router.post("/login", async (req, res) => {
    try{
        const {email,password} =req.body

        const user =await userModel.findOne({email,password})
        if(!user){
            return res.status(400).send({status:"error", error: "incorrect credentials"})
        }

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
        }
        return res.send({status: "success", message:"Logged In", payload :req.session.user})
    }catch(error){
        console.log(error)}
})

router.post("/register", async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} =   req.body 

    const userExists = await userModel.findOne({email})
    if (userExists) {
        return res.status(400).send({status:"error", error: "user already exists"})
    }
    const user= {
        first_name, last_name, email, age, password,
    }

    await userModel.create(user)
    return res.send({status:"succes", message:"user registered"})
    } catch (error){
        console.log(error)
    }
})

export default router