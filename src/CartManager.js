import fs from 'fs'

export default class CartManager {
  constructor() {
    this.path = './Carts.json'
    this.carts = []
  }

  consultCart= async() =>{
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const result = JSON.parse(data);
      return result;
    } else {
      return []
    }
  }

  addCart = async(cart) => {
    const carts = await this.consultCart()
    const existingCart = carts.find(c => c.id === cart.id)
    if (existingCart) {
      existingCart.quantity += cart.quantity
      const jsonData = JSON.stringify(carts)
      await fs.promises.writeFile(this.path, jsonData, 'utf-8')
      return existingCart
    } else {
      const newCarts = [...carts, cart]
      const jsonData = JSON.stringify(newCarts)
      await fs.promises.writeFile(this.path, jsonData, 'utf-8')
      return cart
    }
  }

    
    getCartById = async (id) => {
        if (fs.existsSync(this.path)){
            try{
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const result = JSON.parse(data)
                let idSearch = result.find((event) => event.id == id)
                if (!idSearch) {
                    return "This product with this ID is not found"
                } else {
                    return idSearch
                }
            }catch (error) {
                console.log(error)
            }
        }
    }
    }
