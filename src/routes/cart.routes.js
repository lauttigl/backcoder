import { Router } from 'express'
import CartManager from '../CartManager.js'

const router = Router()

const cartManager = new CartManager()


router.post('/', async (req, res) => {
  let cart = req.body

  if (!cart.id || !cart.quantity) {
    return res
      .status(400)
      .send({ status: 'error', error: 'invalid cart format' })
  }

  const result = await cartManager.addCart(cart)

  return res.status(201).send({ status: 'success', message: result })
})


router.get('/', async (req, res) => {
  const carts = await cartManager.getCarts()
  return res.status(200).send({ status: 'success', data: carts })
})


router.get('/:cid', async (req, res) => {
  const cid = req.params.cid
  const cart = await cartManager.getCartById(cid);

  if (!cart) {
    return res.status(404).send({ status: 'error', error: 'cart not found' })
  }

  return res.status(200).send({ status: 'success', data: cart })
})


router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const quantity = req.body.quantity

  if (!quantity) {
    return res
      .status(400)
      .send({ status: 'error', error: 'invalid product format' });
  }

  const result = await cartManager.addProduct(cid, pid, quantity);

  if (!result) {
    return res.status(404).send({ status: 'error', error: 'cart not found' });
  }

  return res.status(200).send({ status: 'success', data: result });
});


router.put('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;

  if (!quantity) {
    return res
      .status(400)
      .send({ status: 'error', error: 'invalid product format' });
  }

  const result = await cartManager.updateProduct(cid, pid, quantity);

  if (!result) {
    return res.status(404).send({ status: 'error', error: 'cart not found' });
  }

  return res.status(200).send({ status: 'success', data: result })
})

export default router

