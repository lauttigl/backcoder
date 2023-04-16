import { Router } from 'express'
import CartManager from '../dao/CartManager.js'
import { cartModel } from '../dao/models/cart.models.js'

const router = Router()

const cartManager = new CartManager()

router.post('/', async (req,res) => {
  try {
    const { quantity} = req.body
    if ( !quantity)
    return res
    .status(400)
    .send ({status:"error", error: "missing properties"})

    const cart = {
      quantity
    }
    const cartCreated = await cartModel.create(cart)
  return res.send({status:"success", payload: cartCreated})
  } catch (error) {
    console.log(error)
  }
})



router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find({ quantity: { $ne: 0 } });

    return res.send({ status: "success", payload: carts });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "server error" });
  }
});



router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate('products');

    if (!cart) {
      return res.status(400).send({ status: "error", error: "missing information" });
    }

    return res.send({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
  }
});



router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).send({ status: 'error', error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(product => product._id.toString() === pid);

    if (productIndex === -1) {
      return res.status(404).send({ status: 'error', error: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = quantity;

    const updatedCart = await cart.save();

    return res.send({ status: 'success', payload: updatedCart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', error: 'Server error' });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { productId, quantity } = req.body;

    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).send({ status: 'error', error: 'Cart not found' });
    }

    const existingProduct = cart.products.find(product => product.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    const updatedCart = await cart.save();

    return res.send({ status: 'success', payload: updatedCart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', error: 'Server error' });
  }
});


router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).send({ status: "error", error: "cart not found" });
    }

    cart.quantity = 0;
    await cart.save();


    const carts = await cartModel.find({});

 
    for (let i = 0; i < carts.length; i++) {
      const currentCart = carts[i];
      if (currentCart.products.includes(cid)) {
        currentCart.products = currentCart.products.filter((productId) => productId !== cid);
        await currentCart.save();
      }
    }

    return res.send({ status: "success", message: "Cart removed" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "server error" });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).send({ status: "error", error: "cart not found" });
    }


    const productIndex = cart.products.findIndex(p => p._id.equals(pid));


    if (productIndex === -1) {
      return res.status(404).send({ status: "error", error: "product not found in cart" });
    }

  
    cart.products.splice(productIndex, 1);
    await cart.save();

    return res.send({ status: "success", message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "server error" });
  }
});




export default router

