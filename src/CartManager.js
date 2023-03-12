// import fs from 'fs';



// export default class CartManager {
//     constructor(){
//         this.path = './Products.json';
//         this.cart = [];
//     }

// consultCart = async () => {
//     if (fs.existsSync(this.path)) {
//       const data = await fs.promises.readFile(this.path, 'utf-8')
//       const result = JSON.parse(data)
//       console.log(result)
//       return result
//     } else {
//       return []
//     }
//   }

//   addCart = async (cart) => {
//     const carts = await this.consultCart();
//     if (carts.length === 0) {
//       cart.id = 1
//     } else {
//       cart.id = carts[carts.length - 1].id + 1;
//     }
//     carts.push(cart)
//     await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
//     return carts
//   }

// getCarts = async () => {
//     if (fs.existsSync(this.path)) {
//       const data = await fs.promises.readFile(this.path, 'utf-8')
//       const result = JSON.parse(data)
//       console.log(result)
//       return result
//     } else {
//       return []
//     }
//   }

