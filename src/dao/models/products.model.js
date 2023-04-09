import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    code: String,
    price: Number,
    stock: Number,
})

export const productModel = mongoose.model(productCollection, productSchema)