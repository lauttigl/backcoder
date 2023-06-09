import mongoose from "mongoose";
import { Schema } from "mongoose";

const cartCollection = "cart"

// const cartSchema = new mongoose.Schema({
//    quantity: {
//      type: Number,
//      required: true
//    },
//    products: [{
//      product: {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: 'products'
//      },
//      quantity: {
//        type: Number,
//        required: true
//      }
//    }]
//  });
 
const cartSchema = new mongoose.Schema({
   quantity: {
     type: Number,
     required: true
   },
   products: [{
     product: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'products'
     },
     quantity: {
       type: Number,
       required: true
     }
   }]
 });

 

export const cartModel = mongoose.model(cartCollection, cartSchema)