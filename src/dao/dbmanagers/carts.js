import { cartModel } from "../models/cart.models.js";

export default class CartManager {
    constructor() {}

    getCart = async () => {
        try {
            const carts = await cartModel.find()
            return carts
        } catch(error) {
            console.log(error)
        }
    }

    getCartById = async (id) => {
        try {
            const cart = await cartModel.findOne({_id:id}).populate("products.product")
            return cart
        } catch (error){
            console.log(error)
        }
    }

    addCart = async (cart) => {
        try {
            const createdCart = cartModel.create(cart)
            return createdCart
        } catch (error) {
            console.log(error)
        }
    }
    addProductTo = async (cartId, productId, quantity) => {
        try {
            const updatedCart = await cartModel.updateOne({_id: cartId},
                {$push:{products:[{product: productId, quantity}]}})
                return updatedCart
    } catch (error) {
        console.log(error)
    }
    }
}