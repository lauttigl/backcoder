import { productModel } from "../models/products.model.js";

export default class ProductManager{
    constructor(){}   
    
    getProducts = async () => {
        try {
            const products = await productModel.find().lean()
            
            return products
            
        }catch (error) {
            console.log(error)
        }
    }

    addProduct = async (product) => {
        try {
            const createdProduct = await productModel.create(product)
            return createdProduct
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findOne({_id: id})
            return product
        } catch (error) {
            console.log (error)
        }
    }

    updateProduct = async (id, change) => {
        try {
            const updatedProduct = await productModel.updateOne({_id:id}, change)
            return updatedProduct
        } catch (error) {
            console.log(error)
        }

        deleteProduct = async (id) => {
            try {
                const deletedProduct = await productModel.deleteOne({_id: id})
                return deletedProduct
            } catch (error){
                console.log(error)
            }
        }
    }
}